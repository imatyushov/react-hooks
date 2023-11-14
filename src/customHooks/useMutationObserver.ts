import {useEffect, useState} from "react";
import { useLatest } from "./useLatest";

export function useMutationObserver(cb, options) {
    const [element, setElement] = useState(null);
    const latestCb = useLatest(cb);
    useEffect(() => {
        if (!element) return;
        const observer = new MutationObserver((...args) => {
            latestCb.current(...args);
            observer.observe(element, options);
            return function cleanUp() {
                observer.disconnect();
            }
        });
    }, [latestCb, element, options]);
    return setElement;
}