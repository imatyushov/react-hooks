import {useReducer, useState} from 'react';
import {initialProps, updateRandomProp} from "./utils/utils";
import {useWhyDidUpdate} from "./customHooks/useWhyDidUpdate";

//Todo: работа useEffect, только после того как состоится рендер и обновится дом

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