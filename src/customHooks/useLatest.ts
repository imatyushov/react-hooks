import {useCallback, useLayoutEffect, useRef} from "react";

export function useLatest<T>(value: T) {
    const valueRef = useRef(value);
    useLayoutEffect(() => {
        valueRef.current = value;
    }, [value]);
    return valueRef;
}

export function useFnArgs<T extends (...args: any[]) => any>(args: T) {
    const argsRef = useRef(args);
    useLayoutEffect(() => {
        argsRef.current = args;
    }, [args]);
    return useCallback(() => {
        argsRef.current();
    }, [])
}