import {useCallback, useEffect, useRef, useState} from "react";


//Todo: жизненный цикл компонента mount -> update -> unmount

export function useIsMounted() {
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => {
          isMounted.current = false;
      }
    },[]);
    return isMounted;
}

//Todo: обновляем стейт только в случае mount компонента;
export function useSafeState(initialValue) {
    const [state, setState] = useState(initialValue);
    const isMounted = useIsMounted();

    const updateState = useCallback((newValue) => {
        if (isMounted.current) {
            setState(newValue);
        }
    }, [isMounted]);

    return [state, updateState];
}