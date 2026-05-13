/**
 * GamepadIcon — Game icon for C64-themed styling.
 * Inline SVG React component accepting className prop.
 */
import type { SVGProps } from "react";

export default function GamepadIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="2" y="6" width="20" height="12" rx="3" />
      {/* D-pad */}
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="6" y1="12" x2="10" y2="12" />
      {/* Buttons */}
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
