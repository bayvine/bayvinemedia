import { useState } from "react"
import debounce from "lodash/debounce"
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect"

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false)

	useIsomorphicLayoutEffect(() => {
		const updateSize = () => {
			setIsMobile(window.innerWidth < 768)
		}
		window.addEventListener("resize", debounce(updateSize, 250))
		// updateSize();
		return () => window.removeEventListener("resize", updateSize)
	}, [])

	return isMobile
}

export default useIsMobile
