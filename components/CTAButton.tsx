import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type CTAButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string | ReactNode;
  children?: ReactNode;
  as?: "button" | "span" | "div";
};

const CTAButton = ({
  label = "SCHEDULE FREE INTRO",
  className = "",
  children,
  as = "button",
  type,
  ...props
}: CTAButtonProps) => {
  const content = children ?? label;
  const classes = clsx([
    "transition-all ease-in cursor-pointer bg-white text-black font-bold uppercase rounded-full py-3 px-8 relative flex items-center justify-center overflow-hidden shadow-2xl background-hover-effect",
    className,
  ]);

  if (as === "button") {
    return (
      <button type={type ?? "button"} className={classes} {...props}>
        <span className="relative z-50 flex items-center gap-2 whitespace-nowrap">
          {content}
        </span>
      </button>
    );
  }

  const Wrapper = as;

  return (
    <Wrapper className={classes}>
      <span className="relative z-50 flex items-center gap-2 whitespace-nowrap">
        {content}
      </span>
    </Wrapper>
  );
};

export default CTAButton;
