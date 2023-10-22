import {DependencyList, useRef} from "react";

export function areDepsTheSame(prevDeps, currentDeps) {
    if (prevDeps.length !== currentDeps.length) {
        return false;
    }
    for (let index = 0, length = prevDeps.length; index < length; index++) {
        if (Object.is(prevDeps[index], currentDeps[index]))
            return false
    }
    return true;
}

export function useMemo<T>(computeValue: () => T, deps?: DependencyList): T {
    const previousDeps = useRef(null);
    const previousComputeValue = useRef(null);

    if (previousDeps.current && areDepsTheSame(previousDeps.current, deps)) {
        return previousComputeValue.current;
    }

    const computedResult = computeValue();
    previousDeps.current = deps;
    previousComputeValue.current = computeValue;
    return computedResult;
}

export function useCallback<T extends Function>(callback: T, deps?: DependencyList): T {
    return useMemo(() => callback, [...deps]);
}