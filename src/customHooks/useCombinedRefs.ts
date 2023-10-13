import {useCallback} from "react";

export function useCombinedRefs(...refs) {
    const combineRef = useCallback((element) => {
        refs.forEach((ref) => {
            if (!ref) return;
            if (typeof ref === 'function') {
                ref(element);
            }
            else {
                ref.current = element;
            }
        })
    }, [refs])
    return combineRef;
}