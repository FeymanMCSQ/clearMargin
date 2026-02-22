"use client";

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function CTAButton({ children, className, style }: CTAButtonProps) {
  const handleClick = () => {
    const el = document.getElementById("signup");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
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

