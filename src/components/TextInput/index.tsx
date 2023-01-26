import { KeyboardEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export type TextInputProps = {
    placeholder?: string;
    onChange?: (value: string) => void;
};

export const TextInput = ({ placeholder, onChange }: TextInputProps): JSX.Element => {
    const [text, setText] = useState<string>('');
    const [value] = useDebounce(text, 300);

    const handleOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
    };

    useEffect(() => {
        value && onChange && onChange(value);
    }, [value]);

    return <input onKeyUp={handleOnKeyUp} placeholder={placeholder} />
};