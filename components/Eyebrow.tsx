import clsx from "clsx";
import { type ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

const Eyebrow = ({ children, className }: EyebrowProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full border px-4 py-1.5 text-lg",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Eyebrow;
