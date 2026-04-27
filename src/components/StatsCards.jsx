import React, { useEffect, useState, useRef } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { GM_CONTRACT_ADDRESS, GM_CONTRACT_ABI } from '../config/contract';

const OdometerValue = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsUpdating(false);
      }, 50);
      prevValue.current = value;
      return () => clearTimeout(timer);
    }
    setDisplayValue(value);
  }, [value]);

  const digits = String(displayValue).split('');

  return (
    <span className={`stat-card-value ${isUpdating ? 'updating' : ''}`}>
      {digits.map((digit, i) => (
        <span key={`${i}-${digit}`} className="odometer-digit">
          {digit}
        </span>
      ))}
    </span>
  );
};

const StatsCards = ({ refreshTrigger }) => {
  const { address, isConnected } = useAccount();

  // User GM count
  const { data: userGMs, refetch: refetchUser } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: GM_CONTRACT_ABI,
    functionName: 'userGMCount',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && !!address,
    },
  });

  // Global GM count — auto-refresh every 15s
  const { data: totalGMs, refetch: refetchTotal } = useReadContract({
    address: GM_CONTRACT_ADDRESS,
    abi: GM_CONTRACT_ABI,
    functionName: 'totalGMsSent',
    query: {
      refetchInterval: 15000,
    },
  });

  // Refetch on trigger (after successful tx)
  useEffect(() => {
    if (refreshTrigger > 0) {
      refetchUser();
      refetchTotal();
    }
  }, [refreshTrigger]);

  const formatNumber = (val) => {
    if (val === undefined || val === null) return '—';
    return Number(val).toLocaleString();
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-card-icon">🟢</div>
        <div className="stat-card-label">Your GRITUALs Sent</div>
        <OdometerValue
          value={isConnected ? formatNumber(userGMs) : '—'}
        />
      </div>

      <div className="stat-card">
        <div className="stat-card-icon">🌍</div>
        <div className="stat-card-label">Global GRITUALs on Ritual</div>
        <OdometerValue value={formatNumber(totalGMs)} />
      </div>
    </div>
  );
};

export default StatsCards;
