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
        "inline-flex items-center justify-center rounded-full border px-6 py-1 text-lg",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Eyebrow;
