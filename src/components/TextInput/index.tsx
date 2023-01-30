import { clsx } from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './TextInput.module.css';

export type TextInputProps = {
    className?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    maxLength?: number;
    onChange?: (value: string) => void;
    onEnter?: (value: string) => void;
};

export const TextInput = ({ className, placeholder, value = '', disabled = false, maxLength = 80, onChange, onEnter }: TextInputProps): JSX.Element => {
    const [text, setText] = useState<string>(value);
    const [currentValue] = useDebounce(text, 300);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            onEnter && onEnter(value);
        }
    };

    useEffect(() => {
        onChange && onChange(currentValue);
    }, [currentValue]);

    useEffect(() => {
        setText(value);
    }, [value]);

    return <input className={clsx(styles.input, className)} placeholder={placeholder} value={text} disabled={disabled} onChange={handleChange} onKeyDown={handleKeyDown} maxLength={maxLength} />
};