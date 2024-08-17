import { useEffect, useCallback } from 'react';

export default function useDebounce<T>(effect: () => void, dependencies: Array<T>, delay: number) {
	const callback = useCallback(effect, dependencies);

	useEffect(() => {
		const timeout = setTimeout(callback, delay);
		return () => clearTimeout(timeout);
	}, [callback, delay]);
};
