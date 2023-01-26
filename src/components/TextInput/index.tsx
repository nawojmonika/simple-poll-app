import { KeyboardEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export type TextInputProps = {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
};

export const TextInput = ({ placeholder, value, onChange }: TextInputProps): JSX.Element => {
    const [text, setText] = useState<string>(value || '');
    const [currentValue] = useDebounce(text, 300);

    const handleOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
    };

    useEffect(() => {
        onChange && onChange(currentValue);
    }, [currentValue]);

    return <input onKeyUp={handleOnKeyUp} placeholder={placeholder} defaultValue={value} />
};