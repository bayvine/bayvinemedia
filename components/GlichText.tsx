'use client';

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import "./GlitchText.css"

type GlitchTextProps = {
	words: string[]
	intervalMs?: number
	transitionMs?: number
}

export const GlitchText = ({
	words,
	intervalMs = 3500,
	transitionMs = 100,
}: GlitchTextProps) => {
	const safeWords = useMemo(() => {
		if (!Array.isArray(words) || words.length === 0) {
			return [""]
		}

		const cleaned = words
			.map((word) => (word ?? "").trim())
			.filter((word) => word.length > 0)

		return cleaned.length ? cleaned : [""]
	}, [words])

	const [currentIndex, setCurrentIndex] = useState(0)
	const wordsKey = safeWords.join("|")
	const wordsLength = safeWords.length

	useEffect(() => {
		setCurrentIndex(0)
	}, [wordsKey])

	useEffect(() => {
		if (wordsLength <= 1) {
			return
		}

		const id = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % wordsLength)
		}, intervalMs)

		return () => clearInterval(id)
	}, [intervalMs, wordsLength, wordsKey])

	

	return (
		<span className="word-veil tracking-tighter" aria-live="polite" aria-atomic="true">
			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					key={`${wordsKey}-${currentIndex}`}
					className="word-veil__text"
					initial={{ y: "70%", opacity: 0, filter: "blur(30px)" }}
					animate={{ y: "0%", opacity: 1, filter: "blur(0)" }}
					exit={{ y: "-70%", opacity: 0, filter: "blur(50px)" }}
                         transition={{
                              type: "tween",
                              duration: 0.2
					}}
				>
					{safeWords[currentIndex]}
				</motion.span>
			</AnimatePresence>
		</span>
	)
}
