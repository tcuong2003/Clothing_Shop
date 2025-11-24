interface SpinProps {
  size?: "small" | "default" | "large";
  tip?: string;
  fullscreen?: boolean;
  className?: string;
}

export default function Spin({
  size = "default",
  tip,
  fullscreen = false,
  className = "",
}: SpinProps) {
  const spinnerClass = `spin-spinner spin-spinner--${size}`;
  const containerClass = `spin-container ${
    fullscreen ? "spin-container--fullscreen" : ""
  } ${className}`;

  return (
    <div className={containerClass}>
      <div className="spin-content">
        <div className={spinnerClass}>
          <div className="spin-dot spin-dot-1"></div>
          <div className="spin-dot spin-dot-2"></div>
          <div className="spin-dot spin-dot-3"></div>
          <div className="spin-dot spin-dot-4"></div>
        </div>
        {tip && <div className="spin-tip">{tip}</div>}
      </div>
    </div>
  );
}
