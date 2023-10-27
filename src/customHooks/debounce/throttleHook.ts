import {useLatest} from "../useLatest";
import {useEffect, useMemo} from "react";

//Todo: debounce/throttle from lodash;

export function makeDebounceThrottleHook(debounceFunc) {
    return function useDebounce(callback, delay) {
        const latestCallback = useLatest(callback);
        const debouncedFn = useMemo(() =>
            debounceFunc((...args) =>
                latestCallback.current(...args), 300)
        , [latestCallback, delay]);

        useEffect(() => () => debouncedFn.cancel(), [debouncedFn]);
        return debouncedFn;
    }
}