import { useState} from "react";
import {useTitle} from "../customHooks/useTitle";

function TitleUpdater() {
    const [title, setTitle] = useState('Main App');
    useTitle(title);
    return (
        <div>
            <input
                onChange={(event) => setTitle(event.target.value)}
                value={title}
            />
        </div>
    )
}

export function App() {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <button onClick={() => setVisible(v => !v)}>Toggle</button>
            {visible && <TitleUpdater/>}
        </div>
    )
}