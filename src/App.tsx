import {useEffect, useReducer, useRef, useState} from 'react';
import {initialProps, updateRandomProp} from "./utils/utils";

//Todo: работа useEffect, только после того как состоится рендер и обновится дом

export function useWhyDidUpdate(currentProps) {
    const previousPropRef = useRef(null);
    useEffect(() => {
        previousPropRef.current = currentProps;
    }, [currentProps]);

    const previousProps = previousPropRef.current;

    if (!previousProps) {
        console.log('initial first render');
        return;
    }
    const previousKeys = Object.keys(previousProps);
    const currentKeys = Object.keys(currentProps);

    const keys = [...new Set(currentKeys.concat(previousKeys))];

    let hasChanged = false;

    keys.forEach((key) => {
        if (currentProps[key] !== previousProps[key]) {
            console.log(`prop ${key} changed`);
            console.log(`prev value ${previousProps[key]}`);
            console.log(`current value ${currentProps[key]}`);
            hasChanged = true;
        }
    });

    if (!hasChanged) {
        console.log('state changed')
    }
}

function InnerComponent(props) {
    useWhyDidUpdate(props);
    return (
        <div>
            <pre>{JSON.stringify(props, null, 10)}</pre>
        </div>
    )
}

export function App() {
    const [props, setProps] = useState(() => initialProps);
    const [, forceUpdate] = useReducer(count =>  count + 1, 0);

    return (
        <>
            <button onClick={forceUpdate}>Update App</button>
            <div className='App'>
                <button
                    onClick={() => setProps((props) => updateRandomProp(props))}>
                    Update
                </button>
                <InnerComponent {...props}/>
            </div>
        </>
    )
}