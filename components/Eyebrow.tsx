import clsx from "clsx";
import { type ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  invert?: boolean;
};

const Eyebrow = ({ children, className, invert = false }: EyebrowProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full border px-4 py-1 text-sm xl:text-lg",
        invert && "border-white bg-white text-black font-bold",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Eyebrow;
