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

export type OptionProps = Partial<Option> & Omit<TextInputProps, 'onChange' | 'onEnter' | 'className' | 'maxLength'> & {
    button?: OptionButton;
    disabled?: boolean;
    onChange?: (id: string, value: string) => void;
    onEnter?: (id: string, value: string) => void;
    testId?: string;
};

export const OptionInput = ({ placeholder, value, button, onChange, onEnter, id = uuidv4(), disabled = false, testId = 'option-input' }: OptionProps): JSX.Element => {
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
        <div className={styles.option} data-testid={testId}>
            <TextInput className={styles.input} placeholder={placeholder} value={value} onChange={handleTextChange} onEnter={handleEnter} disabled={disabled} />
            <Button className={styles.button} {...button} onClick={handleButtonClick}>{button?.content ? button?.content : 'X'}</Button>
        </div>
    );
};