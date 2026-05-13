/**
 * BookIcon — Book / lesson icon for C64-themed styling.
 * Inline SVG React component accepting className prop.
 */
import type { SVGProps } from "react";

export default function BookIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
      {/* Book cover */}
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      {/* Pages lines */}
      <line x1="9" y1="7" x2="16" y2="7" />
      <line x1="9" y1="11" x2="16" y2="11" />
      <line x1="9" y1="15" x2="13" y2="15" />
    </svg>
  );
}
