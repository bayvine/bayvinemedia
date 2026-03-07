"use client";

import { PointerEvent, useCallback, useEffect, useRef } from "react";
import clsx from "clsx";

type SectionProps = {
} & React.ComponentPropsWithoutRef<"section">;

const Section = ({ className, children,  ...props }: SectionProps) => {
  return (
    <section {...props} className={clsx("lg:mx-auto", className)}>
      <div
        className={clsx([
          "px-4 w-full md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto",
        ])}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
