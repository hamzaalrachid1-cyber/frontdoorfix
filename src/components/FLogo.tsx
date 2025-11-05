interface FLogoProps {
  className?: string;
  size?: number;
}

export default function FLogo({ className = '', size = 32 }: FLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="fLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="1" />
          <stop offset="100%" stopColor="#EAB308" stopOpacity="1" />
        </linearGradient>
      </defs>
      
      {/* Background circle with gradient */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#fLogoGradient)"
      />
      
      {/* Letter F - bold and modern */}
      <path
        d="M 30 25 L 30 75 M 30 25 L 65 25 M 30 48 L 55 48"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

