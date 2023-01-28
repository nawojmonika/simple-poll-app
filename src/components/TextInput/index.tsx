import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './TextInput.module.css';

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

    return <input className={styles.input} placeholder={placeholder} value={text} disabled={disabled} onChange={handleChange} maxLength={80} />
};