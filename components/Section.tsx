"use client"

import { PointerEvent, useCallback, useEffect, useRef } from "react"
import clsx from "clsx"

type SectionProps = {
	hasBlub: boolean
	ref: React.Ref<HTMLElement>
} & React.ComponentPropsWithoutRef<"section">

const Section = ({ className, children,ref, hasBlub = false, ...props }: SectionProps) => {
	
	return (
		<section
			{...props}
			
			className={clsx("lg:mx-auto", hasBlub && "section-shell", className)}
		>
			{hasBlub && <div className={clsx(["section-shell__background"])} aria-hidden="true" />}
			<div
				className={clsx([hasBlub && "section-shell__inner", "w-full md:max-w-md lg:max-w-4xl xl:max-w-6xl 2xl:max-w-screen-2xl mx-auto"])}

			>
				{children}
			</div>
		</section>
	)
}

export default Section
