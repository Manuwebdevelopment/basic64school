/**
 * CodeIcon — Code / developer icon for C64-themed styling.
 * Inline SVG React component accepting className prop.
 */
import type { SVGProps } from "react";

export default function CodeIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
      {/* Left bracket */}
      <polyline points="16 18 22 12 16 6" />
      {/* Right bracket */}
      <polyline points="8 6 2 12 8 18" />
      {/* Middle line */}
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
}
