import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './TextInput.module.css';

export type TextInputProps = {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    onEnter?: (value: string) => void;
};

export const TextInput = ({ placeholder, value = '', disabled = false, onChange, onEnter }: TextInputProps): JSX.Element => {
    const [text, setText] = useState<string>(value);
    const [currentValue] = useDebounce(text, 300);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (value.length && event.key === 'Enter') {
            onEnter && onEnter(value);
        }
    };

    useEffect(() => {
        onChange && onChange(currentValue);
    }, [currentValue]);

    useEffect(() => {
        setText(value);
    }, [value]);

    return <input className={styles.input} placeholder={placeholder} value={text} disabled={disabled} onChange={handleChange} onKeyDown={handleKeyDown} maxLength={80} />
};