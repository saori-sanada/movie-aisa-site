type AisaServiceIconProps = {
  name: string;
};

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AisaServiceIcon({ name }: AisaServiceIconProps) {
  if (name === "guide") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="23" cy="25" r="13" />
        <path d="m28 19-3.2 8.2-8.3 3.2 3.2-8.2L28 19ZM23 9v3M23 38v3M7 25h3M36 25h3" />
        <path d="m37 7 1.2 3.1L41 11.3l-2.8 1.2L37 16l-1.2-3.5L33 11.3l2.8-1.2L37 7Z" />
      </svg>
    );
  }

  if (name === "automation") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <path d="M37 18a14 14 0 0 0-23-5l-3 3M11 10v6h6M11 30a14 14 0 0 0 23 5l3-3M37 38v-6h-6" />
        <circle cx="24" cy="24" r="7" />
        <path d="M24 14v3M24 31v3M14 24h3M31 24h3M17 17l2 2M29 29l2 2M31 17l-2 2M19 29l-2 2" />
      </svg>
    );
  }

  if (name === "creative") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <rect x="7" y="13" width="31" height="25" rx="3" />
        <circle cx="14" cy="20" r="2.5" />
        <path d="m10 34 9-9 6 6 5-5 8 8" />
        <path d="m38 5 1.4 3.6L43 10l-3.6 1.4L38 15l-1.4-3.6L33 10l3.6-1.4L38 5Z" />
      </svg>
    );
  }

  if (name === "tools") {
    return (
      <svg {...iconProps} aria-hidden="true">
        <rect x="5" y="8" width="31" height="27" rx="3" />
        <path d="M5 15h31M10 11.5h.1M15 11.5h.1" />
        <circle cx="35" cy="34" r="6" />
        <path d="M35 25v3M35 40v3M26 34h3M41 34h3M29 28l2 2M39 38l2 2M41 28l-2 2M31 38l-2 2" />
      </svg>
    );
  }

  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M7 10h25a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5H19l-8 6v-6H7a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5Z" />
      <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="21" r="1" fill="currentColor" stroke="none" />
      <circle cx="26" cy="21" r="1" fill="currentColor" stroke="none" />
      <path d="M37 18h5M37 27h5M42 18l3-3M42 27l3 3" />
      <circle cx="45" cy="15" r="2" />
      <circle cx="45" cy="30" r="2" />
    </svg>
  );
}
