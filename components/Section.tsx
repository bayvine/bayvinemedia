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
          "w-full md:max-w-md lg:max-w-4xl xl:max-w-6xl 2xl:max-w-screen-2xl mx-auto",
        ])}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
