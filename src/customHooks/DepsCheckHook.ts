import React, {useEffect, useRef} from "react";
import equal from "fast-deep-equal";

export function usePreviousDeps<T>(value: T) {
    const valueRef = useRef<T | null>(null);
    useEffect(() => {
        valueRef.current = value
    }, [value]);

    return valueRef;
}

export function useCustomDepsCompare(deps: any[], isEqual:(a: any, b: any) => boolean) {
    const countRef = useRef(0);
    const prevDeps = usePreviousDeps(deps);
    if (!isEqual(prevDeps.current, deps)) {
        countRef.current ++;
    }
    return [countRef.current]
}

export function useDeepEffect(callback: React.EffectCallback, deps: any[]) {
    useEffect(callback, useCustomDepsCompare(deps, equal));
}