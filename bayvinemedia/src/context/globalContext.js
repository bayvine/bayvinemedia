import React, { createContext, useReducer, useContext } from "react"

const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

const globalReducer = (state, action) => {
	switch (action.type) {
		case "CURSOR_TYPE": {
			return {
				...state,
				cursorType: action.cursorType,
			}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, {
		cursorType: false,
		cursorStyles: [
			"pointer",
			"hovered",
			"contrast",
			"image-one",
			"image-two",
			"image-three",
			"image-four",
			"hovered-contrast",
		],
	})

	return (
		<GlobalDispatchContext.Provider value={dispatch}>
			<GlobalStateContext.Provider value={state}>
				{children}
			</GlobalStateContext.Provider>
		</GlobalDispatchContext.Provider>
	)
}

//custom hooks for when we want to use our global state
export const useGlobalStateContext = () => useContext(GlobalStateContext)

export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)
