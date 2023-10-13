import {useState} from "react";
import {useDeepEffect} from "./customHooks/DepsCheckHook";

export function App() {
    const [count, setCount] = useState(0);

    const obj = {
        a: 0,
        foo: {
            bar: 'baz'
        }
    }

    useDeepEffect(() => {
        console.log('change obj')
    }, [obj])

    return(
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
            <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
        </div>
    )
}
