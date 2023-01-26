import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export type TextInputProps = {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
};

export const TextInput = ({ placeholder, value = '', disabled = false, onChange }: TextInputProps): JSX.Element => {
    const [text, setText] = useState<string>(value);
    const [currentValue] = useDebounce(text, 300);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
    };

    useEffect(() => {
        onChange && onChange(currentValue);
    }, [currentValue]);

    useEffect(() => {
        setText(value);
    }, [value]);

    return <input placeholder={placeholder} value={text} disabled={disabled} onChange={handleChange} />
};