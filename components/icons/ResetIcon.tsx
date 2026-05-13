/**
 * ResetIcon — Reset / clear icon for C64-themed styling.
 * Inline SVG React component accepting className prop.
 */
import type { SVGProps } from "react";

export default function ResetIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
      <path d="M3 12a9 9 0 1 1 3 7" />
      <polyline points="3 7 3 12 8 12" />
    </svg>
  );
}
