import { useCallback, useRef } from "react";

const useCallbackRef = <T>(callback: (node: T) => void, cleanup?: (current: T) => void) => {
	const ref = useRef<T>(null);
	const setRef = useCallback<(node: T) => void>(node => {
		if (ref.current) {
			if (cleanup) {
				cleanup(ref.current);
			}
		}

		if (node) {
			callback(node);
		}

		ref.current = node;
	}, []);

	return [setRef];
};

export default useCallbackRef;
