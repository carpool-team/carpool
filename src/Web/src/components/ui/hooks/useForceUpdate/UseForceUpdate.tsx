import { useState } from "react";

/**
 * Taken from:
 * https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render
 */
const useForceUpdate: () => () => void = () => {
	const [value, setValue] = useState(0); // integer state
	return () => setValue(value => value + 1); // update the state to force render
};

export default useForceUpdate;
