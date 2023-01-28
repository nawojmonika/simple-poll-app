import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput, TextInputProps } from '../TextInput';
import { Option } from '../OptionsContext';
import { Button, ButtonProps } from '../Button';
import styles from './OptionInput.module.css';

type OptionButton = Omit<ButtonProps, 'onClick' | 'children'> & {
    onClick?: (id: string, value: string) => void;
    content?: React.ReactNode;
};

export type OptionProps = Partial<Option> & Omit<TextInputProps, 'onChange' | 'onEnter'> & {
    button?: OptionButton;
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
            <TextInput className={styles.input} placeholder={placeholder} value={value} onChange={handleTextChange} onEnter={handleEnter} disabled={disabled} />
            <Button className={styles.button} {...button} onClick={handleButtonClick}>{button?.content ? button?.content : 'X'}</Button>
        </div>
    );
};