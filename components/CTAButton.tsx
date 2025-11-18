import clsx from "clsx"
import { type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react"

type CTAButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	label?: string
	children?: ReactNode
	size?: number
}

const CTAButton = ({
	label = "SCHEDULE FREE INTRO",
	children,
	className = "",
	style,
	...props
}: CTAButtonProps) => {

	return (
		<button
			type="button"
			className={clsx([
				"p-2 shrink-0 w-[150px] transition-colors ease-in duration-75  border-4 border-white cursor-pointer font-extrabold flex items-center justify-center rounded-full aspect-square hover:bg-white hover:text-black",
				className,
			])}
			{...props}
		>
			{label}
		</button>
	)
}

export default CTAButton
