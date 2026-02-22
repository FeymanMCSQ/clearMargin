"use client";

declare global {
  interface Window {
    ml?: (...args: unknown[]) => void;
  }
}

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CTAButton({ children, className, style }: CTAButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.ml) {
      window.ml("show");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
