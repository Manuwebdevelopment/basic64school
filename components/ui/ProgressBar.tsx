/**
 * ProgressBar — C64-themed progress bar for lesson completion tracking.
 * Accepts value (0-100), max, label, and className props.
 */
interface ProgressBarProps {
  /** Current progress value */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Optional label text */
  label?: string;
  /** Additional CSS class */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  className = "",
  style,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`c64-progress-bar ${className}`.trim()} style={style}>
      {label && <div className="c64-progress-bar__label">{label}: {Math.round(percentage)}%</div>}
      <div className="c64-progress-bar__track">
        <div
          className="c64-progress-bar__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
