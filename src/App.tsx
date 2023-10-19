import {useState} from "react";
import {batchUpdates} from './utils/batch';


export function App() {
    const [count, setCount] = useState(0);
    const incrementSync = () => {
        console.log('update 1');
        setCount((c) => c + 1);
        console.log('update 2');
        setCount((c) => c + 1);
    }
    const incrementAsync = () => {
        batchUpdates(() => {
            Promise.resolve().then(() => {
                incrementSync();
            })
        })
    }

    console.log('render');
    return (
        <div>
            <div>Count: {count}</div>
            <button onClick={incrementSync}>Increment sync</button>
            <button onClick={incrementAsync}>Increment async</button>
        </div>
    )
}
