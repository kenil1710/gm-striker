import React, { useState, useEffect, useCallback } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { GM_CONTRACT_ADDRESS, GM_CONTRACT_ABI } from '../config/contract';

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

const getStorageKey = (address) => `gm_cooldown_${address?.toLowerCase()}`;

const getCooldownEnd = (address) => {
  if (!address) return null;
  const stored = localStorage.getItem(getStorageKey(address));
  return stored ? parseInt(stored, 10) : null;
};

const setCooldownEnd = (address) => {
  if (!address) return;
  const end = Date.now() + COOLDOWN_MS;
  localStorage.setItem(getStorageKey(address), end.toString());
  return end;
};

const formatCountdown = (ms) => {
  if (ms <= 0) return null;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const GMButton = ({ isConnected, onSuccess }) => {
  const { address } = useAccount();
  const [showSuccess, setShowSuccess] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const {
    writeContract,
    data: hash,
    isPending,
    isError,
    error,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Cooldown timer
  useEffect(() => {
    if (!address) return;

    const updateCooldown = () => {
      const end = getCooldownEnd(address);
      if (end) {
        const remaining = end - Date.now();
        setCooldownRemaining(remaining > 0 ? remaining : 0);
      } else {
        setCooldownRemaining(0);
      }
    };

    updateCooldown();
    const interval = setInterval(updateCooldown, 1000);
    return () => clearInterval(interval);
  }, [address]);

  useEffect(() => {
    if (isConfirmed && hash) {
      setShowSuccess(true);
      setTxHash(hash);
      setCooldownEnd(address);
      setCooldownRemaining(COOLDOWN_MS);
      onSuccess?.();
      const timer = setTimeout(() => {
        setShowSuccess(false);
        reset();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, hash]);

  const handleSendGM = () => {
    writeContract({
      address: GM_CONTRACT_ADDRESS,
      abi: GM_CONTRACT_ABI,
      functionName: 'sendGM',
    });
  };

  const isLoading = isPending || isConfirming;
  const isOnCooldown = cooldownRemaining > 0;
  const countdownStr = formatCountdown(cooldownRemaining);

  const buttonClass = [
    'gm-button',
    isLoading ? 'pending' : '',
    showSuccess ? 'success' : '',
    isOnCooldown && !isLoading && !showSuccess ? 'cooldown' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (!isConnected) {
    return (
      <div className="gm-button-container">
        <p className="connect-prompt">Connect your wallet to send a GM ✨</p>
      </div>
    );
  }

  return (
    <div className="gm-button-container">
      <button
        className={buttonClass}
        onClick={handleSendGM}
        disabled={isLoading || isOnCooldown}
      >
        {isPending
          ? 'Confirm…'
          : isConfirming
          ? 'Sending…'
          : showSuccess
          ? 'GM! 🌿'
          : isOnCooldown
          ? '⏳'
          : 'Send GM'}
      </button>

      {isOnCooldown && !isLoading && !showSuccess && (
        <div className="cooldown-timer">
          <span className="cooldown-label">Next GM available in</span>
          <span className="cooldown-time">{countdownStr}</span>
        </div>
      )}

      {isError && (
        <p style={{ color: '#e57373', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center', maxWidth: 360 }}>
          {error?.shortMessage || 'Transaction failed'}
        </p>
      )}

      {txHash && (
        <a
          href={`https://explorer.ritualfoundation.org/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tx-link"
        >
          View on Ritual Explorer →
        </a>
      )}
    </div>
  );
};

export default GMButton;
