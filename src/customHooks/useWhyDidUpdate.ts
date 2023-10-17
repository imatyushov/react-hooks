import {useEffect, useRef} from "react";

export function useWhyDidUpdate(currentProps) {
    const previousPropsRef = useRef(null);
    useEffect(() => {
        previousPropsRef.current = currentProps
    }, [currentProps]);

    const previousProps = previousPropsRef.current;
    if (!previousProps) {
        console.log('initial first render');
        return;
    }
    const previousKeys = Object.keys(previousProps);
    const currentKeys = Object.keys(currentProps);
    const allKeys = [...new Set(currentKeys.concat(previousKeys))];

    let hasChanged = false;
    allKeys.forEach((key) => {
        if (currentProps[key] !== previousProps[key]) {
            console.log(`prop ${key} changed`);
            console.log(`prev value ${previousProps[key]}`);
            console.log(`current value ${currentProps[key]}`);
            hasChanged = true;
        }
    })
    if (!hasChanged) {
        console.log('state has changed');
    }
}