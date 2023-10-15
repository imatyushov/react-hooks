import {memo, useCallback, useState} from "react";
import {useLatest} from '../customHooks/useLatest';

interface IProps {
    text: string;
    onClick: () => void;
}

const Button = memo((props: IProps) => {
    const {text, onClick} = props;

    console.log('button rendered');
    return <button onClick={onClick}>{text}</button>;
})

export function App() {
    const [text, setText] = useState('');
    const latestText = useLatest(text);

    const onClick = useCallback(() => {
        console.log('save text:', latestText.current);
    }, [latestText]);

    return (
        <div className='App'>
            <input
                value={text}
                onChange={(event) =>
                    setText(event.target.value)}
                placeholder={'Search...'}
            />
            <Button text='submit' onClick={onClick} />
        </div>
    )
}