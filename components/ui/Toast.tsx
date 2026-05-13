"use client";
/**
 * Toast — C64-themed toast notification component.
 * Accepts message, type, duration, and visible props.
 * Auto-dismisses after duration (default: 4000ms).
 */
import { useEffect, useState, useCallback } from "react";

type ToastType = "info" | "success" | "error" | "warning";

interface ToastProps {
  /** Notification message */
  message: string;
  /** Toast type for styling */
  type?: ToastType;
  /** Auto-dismiss duration in ms (default: 4000) */
  duration?: number;
  /** Whether the toast is visible */
  visible: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Additional CSS class */
  className?: string;
}

export default function Toast({
  message,
  type = "info",
  duration = 4000,
  visible,
  onClose,
  className = "",
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!isVisible) return null;

  const typeClass = {
    info: "c64-toast--info",
    success: "c64-toast--success",
    error: "c64-toast--error",
    warning: "c64-toast--warning",
  };

  return (
    <div className={`c64-toast c64-toast--visible ${typeClass[type]} ${className}`.trim()}>
      <span className="c64-toast__message">{message}</span>
      {onClose && (
        <button className="c64-toast__close" onClick={onClose} aria-label="Close">
          &#x2715;
        </button>
      )}
    </div>
  );
}
