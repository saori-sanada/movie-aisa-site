type MovieServiceIconProps = {
  name: string;
};

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MovieServiceIcon({ name }: MovieServiceIconProps) {
  if (name === "video") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <rect x="7" y="11" width="34" height="26" rx="3" />
        <path d="M12 11v26M36 11v26M7 18h5M7 30h5M36 18h5M36 30h5" />
        <path d="m21 19 9 5-9 5Z" />
      </svg>
    );
  }

  if (name === "social") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <rect x="10" y="6" width="22" height="36" rx="5" />
        <path d="M17 10h8M16 34l7-8 5 4 11-13M32 17h7v7" />
      </svg>
    );
  }

  if (name === "design") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <path d="M8 9h25v25H8zM8 15h25M14 9v25" />
        <path d="m27 37 2-8 10-10 5 5-10 10-7 3ZM36 22l5 5" />
      </svg>
    );
  }

  if (name === "direction") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="24" cy="10" r="5" />
        <circle cx="10" cy="37" r="5" />
        <circle cx="24" cy="37" r="5" />
        <circle cx="38" cy="37" r="5" />
        <path d="M24 15v9M10 32v-4h28v4M24 24v8" />
      </svg>
    );
  }

  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="14" y="18" width="25" height="19" rx="3" />
      <path d="m23 24 8 4.5-8 4.5ZM10 8l1.7 4.3L16 14l-4.3 1.7L10 20l-1.7-4.3L4 14l4.3-1.7L10 8ZM36 5l1.2 3.1L40 9.3l-2.8 1.2L36 14l-1.2-3.5L32 9.3l2.8-1.2L36 5Z" />
      <path d="M31 37h10V27h-6" />
    </svg>
  );
}
