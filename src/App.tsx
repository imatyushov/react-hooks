import {useEffect, useReducer, useRef, useState} from 'react';

//Todo: жизненный цикл компонента mount -> update -> unmount

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function useIsMounted() {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])
    return isMounted.current;
}


function List() {
    const [list, setList] = useState([]);
    const isMountedApp = useIsMounted();
    console.log(isMountedApp)

    useEffect(() => {
        sleep(3000)
            .then(() => {setList([1, 2, 3, 4, 5])})

        return () => {}

    }, []);

    if (list.length === 0) {
        return <div>Loading...</div>
    }
    return (
       <ul>
           {list.map((item) =>
               <li key={item}>{item}</li>
           )}
       </ul>
    );
}

export function App() {
    const [isVisible, setIsVisible] = useState(false);
    const [, forceUpdate] = useReducer(c => c + 1, 0);
    console.log('App updated');

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