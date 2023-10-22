import {memo, useReducer, useRef, useState} from "react";
import {useCallback, useMemo} from "./customHooks/customUseCbUseMemo";

interface IChildComponent {
    onClick: () => void;
}
const ChildComponent = memo(({onClick}: IChildComponent) => {
    console.log('Update SUBCOMPONENT');
    return null;
})

export function App() {
    const [count, setCount] = useState(0);
    const [, forceUpdate] = useReducer((state) => state + 1, 0);

    const doubleCount = useMemo(() => {
        console.log('Memo update');
        return count * 2;
    }, [count]);

    console.log('============');

    const onClick = useCallback(() => {
        console.log(doubleCount);
    }, [doubleCount]);

    return (
        <div>
        <div>{count}</div>
            <button onClick={forceUpdate}>Update</button>
            <button onClick={() => setCount((co) => count + 1)}>Increment</button>
            <ChildComponent  onClick={onClick}/>
        </div>)
}
