import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput, TextInputProps } from '../TextInput';
import './OptionInput.css';

type ButtonProps = {
    content: string;
    onClick: (id: string, value: string) => void;
    disabled: boolean;
}

export type OptionProps = Exclude<TextInputProps, 'onChange'> & {
    id?: string;
    button?: Partial<ButtonProps>;
    disabled?: boolean;
};

export const OptionInput = ({ id, placeholder, value, button, disabled = false }: OptionProps): JSX.Element => {
    const [text, setText] = useState('');

    const handleButtonClick = (): void => {
        const inputId = id || uuidv4();
        button?.onClick && button.onClick(inputId, text);
    };

    const handleTextChange = (value: string): void => {
        setText(value);
    };

    return (
        <div className='option'>
            <TextInput placeholder={placeholder} onChange={handleTextChange} value={value} disabled={disabled} />
            <button className='button' onClick={handleButtonClick} disabled={button?.disabled}>{button?.content ? button?.content : 'X'}</button>
        </div>
    );
};