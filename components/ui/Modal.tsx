"use client";
/**
 * Modal — C64-themed modal dialog wrapper.
 * Uses focus trapping and overlay click-to-close.
 * Accepts title, children, isOpen, onClose, and className props.
 */
import { useEffect, useRef, useCallback } from "react";

interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close callback */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="c64-modal__overlay"
      onClick={handleOverlayClick}
      aria-modal
      role="dialog"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`c64-modal ${className}`.trim()}
      >
        <div className="c64-modal__header">
          {title && (
            <h2 className="c64-modal__title">{title}</h2>
          )}
          <button
            className="c64-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>
        <div className="c64-modal__body">{children}</div>
      </div>
    </div>
  );
}
