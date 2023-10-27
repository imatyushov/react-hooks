import {debounce, throttle} from 'lodash';
import { useLayoutEffect, useMemo, useRef, useState} from "react";
import {makeDebounceThrottleHook} from "./customHooks/debounce/throttleHook";

function useLatestCallback(cb) {
    const cbRef = useRef(cb);
    useLayoutEffect(() => {
        cbRef.current = cb;
    }, [cb]);
    return cbRef;
}

const useDebounce = makeDebounceThrottleHook(debounce);
const useThrottle = makeDebounceThrottleHook(throttle);


export function App() {
    const [inputValue, setInputValue ] = useState('');

    const makeRequest = useThrottle((req) => {
        console.log('make req:', req);
    }, 400);

    const handleQueryChange = (event) => {
        const {value} = event.target;
        makeRequest(value);
        setInputValue(value);
    };
    
    return (
        <div>
            <input
                value={inputValue}
                onChange={handleQueryChange}
                placeholder={'Search...'}
            />
        </div>
    )
}
