import { TextInput, TextInputProps } from '../TextInput';
import { v4 as uuidv4 } from 'uuid';
import './OptionInput.css';
import { useState } from 'react';

export type OptionProps = Exclude<TextInputProps, 'onChange'> & {
    id?: string;
    buttonContent?: string;
    onButtonClick?: (id: string, value: string) => void;
};

export const OptionInput = ({ id, placeholder, value, buttonContent, onButtonClick }: OptionProps): JSX.Element => {
    const [text, setText] = useState('');

    const handleButtonClick = (): void => {
        const inputId = id || uuidv4();
        onButtonClick && onButtonClick(inputId, text);
    };

    const handleTextChange = (value: string): void => {
        setText(value);
    }

    return (
        <div className='option'>
            <TextInput placeholder={placeholder} onChange={handleTextChange} value={value} />
            <button className='button' onClick={handleButtonClick}>{buttonContent ? buttonContent : 'X'}</button>
        </div>
    );
};