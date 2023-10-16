import {useReducer, useRef, useState} from "react";
import {useOutsideClick} from "../customHooks/useOutsideClick";

interface ITooltipProps {
    isOpened: boolean;
    onClose: () => void;
}

function Tooltip(props: ITooltipProps) {
    const {isOpened, onClose} = props;
    const tooltipRef = useRef(null);

    useOutsideClick(tooltipRef, onClose, isOpened);

    if (!isOpened) return null;

    return (
        <div ref={tooltipRef} className='tooltip'>
            <div>Some text</div>
        </div>
    )
}

export function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [, forceUpdate] = useReducer(state => state + 1, 0);

    console.log('---')
    function onClose() {
        setIsOpen(false);
    }
    return (
        <>
            <button onClick={forceUpdate}>update</button>
            <div className='tooltip-container'>
                <Tooltip
                    isOpened={isOpen}
                    onClose={onClose}
                />
                <button
                    onClick={() => setIsOpen(prevState => !prevState)}
                    className='tooltip trigger'
                >
                    Click to open tooltip
                </button>
            </div>
        </>
    )
}