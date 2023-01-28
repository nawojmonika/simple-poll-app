import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput, TextInputProps } from '../TextInput';
import { Option } from '../OptionsContext';
import styles from './OptionInput.module.css';

type ButtonProps = {
    content: string;
    disabled: boolean;
    onClick: (id: string, value: string) => void;
};

export type OptionProps = Partial<Option> & Omit<TextInputProps, 'onChange' | 'onEnter'> & {
    button?: Partial<ButtonProps>;
    disabled?: boolean;
    onChange?: (id: string, value: string) => void;
    onEnter?: (id: string, value: string) => void;
};

export const OptionInput = ({ id = uuidv4(), placeholder, value, button, disabled = false, onChange, onEnter }: OptionProps): JSX.Element => {
    const [text, setText] = useState('');

    const handleButtonClick = (): void => {
        button?.onClick && button.onClick(id, text);
    };

    const handleTextChange = (value: string): void => {
        setText(value);
        onChange && onChange(id, value);
    };

    const handleEnter = (value: string): void => {
        onEnter && onEnter(id, value);
    };

    return (
        <div className={styles.option}>
            <TextInput placeholder={placeholder} value={value} onChange={handleTextChange} onEnter={handleEnter} disabled={disabled} />
            <button className={styles.button} onClick={handleButtonClick} disabled={button?.disabled}>{button?.content ? button?.content : 'X'}</button>
        </div>
    );
};