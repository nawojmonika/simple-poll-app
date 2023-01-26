import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput, TextInputProps } from '../TextInput';
import { Option } from '../OptionsContext';
import './OptionInput.css';

type ButtonProps = {
    content: string;
    onClick: (id: string, value: string) => void;
    disabled: boolean;
}

export type OptionProps = Partial<Option> & Omit<TextInputProps, 'onChange'> & {
    button?: Partial<ButtonProps>;
    disabled?: boolean;
    onChange?: (id: string, value: string) => void;
};

export const OptionInput = ({ id = uuidv4(), placeholder, value, button, disabled = false, onChange }: OptionProps): JSX.Element => {
    const [text, setText] = useState('');

    const handleButtonClick = (): void => {
        button?.onClick && button.onClick(id, text);
    };

    const handleTextChange = (value: string): void => {
        setText(value);
        onChange && onChange(id, value);
    };

    return (
        <div className='option'>
            <TextInput placeholder={placeholder} onChange={handleTextChange} value={value} disabled={disabled} />
            <button className='button' onClick={handleButtonClick} disabled={button?.disabled}>{button?.content ? button?.content : 'X'}</button>
        </div>
    );
};