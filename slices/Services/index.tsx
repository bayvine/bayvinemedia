"use client";

import { FC, PointerEvent, useCallback, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import Link from "next/link";
import { RxArrowTopRight } from "react-icons/rx";
import Image from "next/image";
import clsx from "clsx";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

export const ServiceComponent = () => {
  const [position, setPosition] = useState({x: 0, y: 0})
  const [showingImage, setIsShowingImage] = useState(false)
  const handlePointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    const x = event.clientX 
    const y = event.clientY
    console.log({x, y})
    setPosition({x, y})
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsShowingImage(false)
  }, []);

  return (
    <div
    className="isolate relative"
    onPointerEnter={() => setIsShowingImage(e => !e)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Link
        href="#"
        className="w-full px-4 py-12 border-t border-gray-500 flex justify-between group  items-center cursor-pointer  transition-all duration-300"
      >
        <h3 className=" z-50 text-5xl font-semibold mb-4 flex items-center shrink-0 ">
          <span className="mr-4 text-sm text-gray-300 font-extralight w-0.5 h-0.5 flex items-center justify-center border rounded-full p-3 ">
            1
          </span>
          WEB DEVELOPMENT
        </h3>
        <p className="max-w-sm  z-50">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
          consequatur iusto at, perspiciatis eaque.
        </p>
        <RxArrowTopRight
          size={30}
          className="relative z-50 group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-all duration-300"
        />
        {/* <Image
          style={{
            left: position.x + 50,
            top: position.y,
          }}
          alt="hello"
          src={"/images/example.gif"}
          width={400}
          height={400}
          className={clsx(["fixed -z10", showingImage ? 'block' : 'hidden'])}
        /> */}
      </Link>
    </div>
  );
};
/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  return (
    <Section
      hasBlub={false}
      className="bg-black text-slate-50 min-h-screen py-20"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <h2 className="text-2xl font-bold uppercase">Our services</h2>
        <p className="max-w-lg my-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
          dicta officia dolorem magnam, beatae earum. Beatae deleniti quod
          perspiciatis minus accusamus odit quas laudantium quisquam fugiat
          corporis, itaque obcaecati?
        </p>
      </div>

      <div className="my-12">
        <ServiceComponent />
        <ServiceComponent />
        <ServiceComponent />
        <ServiceComponent />
       
      </div>
    </Section>
  );
};

export default Services;
