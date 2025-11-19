"use client"

import { PointerEvent, useCallback, useEffect, useRef } from "react"
import clsx from "clsx"

type SectionProps = React.ComponentPropsWithoutRef<"section">

const Section = ({ className, children, ...props }: SectionProps) => {
	const sectionRef = useRef<HTMLElement>(null)
	const frameRef = useRef<number>()
	const targetRef = useRef({ x: 50, y: 50 })
	const currentRef = useRef({ x: 50, y: 50 })
	const pointerActiveRef = useRef(false)
	const wanderPauseRef = useRef(0)

	const setBlobPosition = useCallback((x: number, y: number) => {
		const node = sectionRef.current
		if (!node) return
		node.style.setProperty("--blob-x", `${x}%`)
		node.style.setProperty("--blob-y", `${y}%`)
	}, [])

	const animateBlob = useCallback(() => {
		const current = currentRef.current
		const target = targetRef.current
		const easing = 0.02
		current.x += (target.x - current.x) * easing
		current.y += (target.y - current.y) * easing
		setBlobPosition(current.x, current.y)
		if (!pointerActiveRef.current && performance.now() >= wanderPauseRef.current) {
			const distance = Math.hypot(target.x - current.x, target.y - current.y)
			if (distance < 1.25) {
				const min = 20
				const max = 80
				targetRef.current = {
					x: Math.random() * (max - min) + min,
					y: Math.random() * (max - min) + min,
				}
				wanderPauseRef.current =
					performance.now() + 2000 + Math.random() * 2500
			}
		}
		frameRef.current = requestAnimationFrame(animateBlob)
	}, [setBlobPosition])

	const handlePointerMove = useCallback(
		(event: PointerEvent<HTMLElement>) => {
			if (!sectionRef.current) return
			const rect = sectionRef.current.getBoundingClientRect()
			const x = ((event.clientX - rect.left) / rect.width) * 100
			const y = ((event.clientY - rect.top) / rect.height) * 100
			pointerActiveRef.current = true
			targetRef.current = { x, y }
		},
		[],
	)

	const handlePointerLeave = useCallback(() => {
		pointerActiveRef.current = false
		wanderPauseRef.current = performance.now() + 800
	}, [])

	useEffect(() => {
		setBlobPosition(50, 50)
		currentRef.current = { x: 50, y: 50 }
		targetRef.current = { x: 50, y: 50 }
		wanderPauseRef.current = performance.now() + 1500
		frameRef.current = requestAnimationFrame(animateBlob)
		return () => {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current)
			}
		}
	}, [animateBlob, setBlobPosition])

	return (
		<section
			{...props}
			ref={sectionRef}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			className={clsx("section-shell text-white lg:mx-auto", className)}
		>
			<div className="section-shell__background" aria-hidden="true" />
               <div className="section-shell__inner 
              
               sm:max-w-xs
               md:max-w-md
               lg:max-w-4xl xl:max-w-6xl 2xl:max-w-screen-2xl mx-auto">
				{children}
			</div>
		</section>
	)
}

export default Section
