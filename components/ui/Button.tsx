/**
 * Button — C64-themed styled button component.
 * Supports primary, secondary, and danger variants.
 * Accepts className, variant, and all standard button props.
 */
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variantClass = {
    primary: "c64-btn c64-btn--primary",
    secondary: "c64-btn c64-btn--secondary",
    danger: "c64-btn c64-btn--danger",
  };

  return (
    <button
      className={`${variantClass[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
