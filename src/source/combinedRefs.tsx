import {useEffect, useReducer, useRef} from "react";
import {useCombinedRefs} from "../customHooks/useCombinedRefs";

function Input(props: any) {
    const {inputRef: parentRef, ...rest} = props;
    const childRef = useRef(null);
    const [, forceUpdate] = useReducer(state => state + 1, 0);

    useEffect(() => {
        childRef.current?.focus();
        console.log('child',childRef.current)
    }, []);

    const callbackRef = useCombinedRefs(childRef, parentRef);

    return (
        <div>
            <button onClick={forceUpdate}>update</button>
            <input {...rest} ref={callbackRef}/>
        </div>
)
}

export function App () {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log('parent', inputRef.current);
    }, [])
    return <Input inputRef={inputRef}/>
}