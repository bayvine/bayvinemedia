import { ElementType, ReactNode } from "react";
import clsx from "clsx";

type AuroraPanelProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "panel" | "card";
};

const AURORA_BACKGROUND = [
  "radial-gradient(circle at 18% 18%, rgba(113, 255, 215, 0.16) 0%, transparent 26%)",
  "radial-gradient(circle at 82% 22%, rgba(119, 194, 255, 0.18) 0%, transparent 24%)",
  "radial-gradient(circle at 50% 100%, rgba(245, 158, 11, 0.12) 0%, transparent 24%)",
  "linear-gradient(180deg, rgba(10, 14, 28, 0.96) 0%, rgba(5, 8, 22, 1) 100%)",
].join(", ");

const AURORA_GRAIN =
  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)";

const variantClasses = {
  panel: "rounded-lg bg-[#050816]",
  card:
    "rounded-lg bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(12,16,30,0.82)_45%,rgba(7,10,20,0.92))] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl",
};

const overlayClasses = {
  panel: "opacity-90",
  card: "opacity-70",
};

const glowClasses = {
  panel: {
    left: "absolute -left-8 top-1/3 h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl",
    right: "absolute right-0 top-0 h-44 w-44 rounded-full bg-sky-300/10 blur-3xl",
  },
  card: {
    left: "absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-emerald-300/8 blur-3xl",
    right: "absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-300/8 blur-3xl",
  },
};

const AuroraPanel = ({
  as: Tag = "div",
  children,
  className,
  contentClassName,
  variant = "card",
}: AuroraPanelProps) => {
  return (
    <Tag
      className={clsx(
        "relative isolate overflow-hidden  text-white",
        variantClasses[variant],
        className,
      )}
    >
       <div className={clsx("relative z-50", contentClassName)}>{children}</div>
      <div
        aria-hidden
        className={clsx("absolute inset-0", overlayClasses[variant])}
        style={{ backgroundImage: AURORA_BACKGROUND }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: AURORA_GRAIN,
          backgroundSize: "26px 26px",
        }}
      />
      <div aria-hidden className={glowClasses[variant].left} />
      <div aria-hidden className={glowClasses[variant].right} />

     
    </Tag>
  );
};

export default AuroraPanel;
