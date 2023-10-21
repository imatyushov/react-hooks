import {useEffect} from "react";

export function useTitle(title, resetOnUnmount=true) {
    useEffect(() => {
        if (!resetOnUnmount) {
            return;
        }
        let initialValue = document.title;
        return () => {
            document.title = initialValue;
        }
    }, [resetOnUnmount]);

    useEffect(() => {
        document.title = title;
    }, [title]);
}