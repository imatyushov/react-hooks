import {useEffect} from "react";
import {useLatest} from './useLatest';

export function useOutsideClick(elementRef, handler, attached=true) {
    const latestHandler = useLatest(handler);
    useEffect(() => {
        if (!attached) {
            return;
        }

        function handleClick(event) {
            if (!elementRef.current) return;
            if (!elementRef.current.contains(event.target)) {
                latestHandler.current();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [elementRef, latestHandler, attached]);
}