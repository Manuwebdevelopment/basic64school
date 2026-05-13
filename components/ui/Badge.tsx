/**
 * Badge — C64-themed badge / pill component.
 * Accepts children, variant, size, and className props.
 */
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  /** Badge label / content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size */
  size?: BadgeSize;
  /** Additional CSS class */
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  const variantClass = {
    default: "c64-badge--default",
    success: "c64-badge--success",
    warning: "c64-badge--warning",
    danger: "c64-badge--danger",
    info: "c64-badge--info",
  };

  const sizeClass = {
    sm: "c64-badge--sm",
    md: "c64-badge--md",
    lg: "c64-badge--lg",
  };

  return (
    <span className={`c64-badge ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}>
      {children}
    </span>
  );
}
