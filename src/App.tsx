import React, {
    useCallback,
    useEffect,
    useInsertionEffect,
    useRef,
    useState
} from "react";
import {useMutationObserver} from "./customHooks/useMutationObserver";


function useCombinedRefs(...refs) {
    const combineRef = useCallback((element) => {
        refs.forEach((ref) => {
            if (!ref) return;
            if (typeof ref === 'function') {
                ref(element);
            } else {
                ref.current = element;
            }
        })
    }, [refs]);
    return combineRef;
}

const options = {
    attributes: true
}


function MutationObserverComponent(props) {
    const { onMutation, children, options, nodeRef } = props;
    const mutationRef = useMutationObserver(
        onMutation,
        options
    );
    const combinedRef = useCombinedRefs(mutationRef, nodeRef);
    return children(combinedRef);
}

export function App() {
    const elementRef = useRef(null);
    const [value, setValue] = useState('');
    const [bool, setBool] = useState(false);

    const Tag = bool ? 'div' : 'section';

    useEffect(() => {
        console.log(elementRef.current);
    }, [elementRef]);

    const mutationRef = useMutationObserver(
        () => console.log('======'),
        options
    )

    const combinedRef = useCombinedRefs(elementRef, mutationRef);
    return (
        <div>
            <div>
                <button onClick={() => setBool((v) => !v)}>
                    Toggle
                </button>
            </div>
            <input
                value={value}
                onChange={(event) => setValue(event.target.value) }
            />
            <MutationObserverComponent
                nodeRef={elementRef}
                options={options}
                onMutation={() => console.log('=========')}>
                {(ref) => bool && <Tag ref={ref} className={value}>
                    {value}
                </Tag>}
            </MutationObserverComponent>
        </div>
    )
}