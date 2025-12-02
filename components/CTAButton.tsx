import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";

type CTAButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string | ReactNode;
  children?: ReactNode;
  size?: number;
};

const CTAButton = ({
  label = "SCHEDULE FREE INTRO",
  className = "",
  children,
  ...props
}: CTAButtonProps) => {
  return (
    <button
      className={clsx([
        "transition-all ease-in  cursor-pointer bg-white text-black font-bold uppercase rounded-full py-3 px-8s relative flex items-center justify-center overflow-hidden shadow-2xl background-hover-effect",
        className,
      ])}
    >
      <span className="relative z-50">{children}</span>
    </button>
  );
};

export default CTAButton;
