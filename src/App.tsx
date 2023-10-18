import {useEffect, useReducer, useState} from 'react';
import {useIsMounted, useSafeState} from "./customHooks/useIsMounted";

//Todo: жизненный цикл компонента mount -> update -> unmount

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function List() {
    const [count, setCount] = useSafeState(0);
    const [list, setList] = useState([]);
    const isMounted = useIsMounted();

    useEffect(() => {
        sleep(3000).then(() => {
            if (isMounted.current) {
                setList([1, 2, 3, 4, 5])
            }
        })

    }, [isMounted]);

    const increment = () => {
      sleep(2000).then(() => {setCount((count) => count + 1)})
    };

    if (list.length === 0) {
        return <div>Loading...</div>
    }
    return (
       <ul>
           <p>{count}</p>
           <button onClick={increment}>Increment Async</button>
           {list.map((item) =>
               <li key={item}>{item}</li>
           )}
       </ul>
    );
}

export function App() {
    const [isVisible, setIsVisible] = useState(false);
    const [, forceUpdate] = useReducer(c => c + 1, 0);

    return (
        <>
            <button onClick={forceUpdate}>Update App</button>
            <div>
                <button onClick={() => setIsVisible((visible) => !visible)}>Toggle</button>
                {isVisible && <List/>}
            </div>
        </>
    )
}
