import { TextInput, TextInputProps } from '../TextInput';
import { v4 as uuidv4 } from 'uuid';
import './OptionInput.css';
import { useRef } from 'react';

export type OptionProps = TextInputProps & {
    id?: string;
    buttonContent?: string;
    onButtonClick?: (id: string, value?: string) => void;
};

export const OptionInput = ({ id, placeholder, buttonContent, onButtonClick }: OptionProps): JSX.Element => {
    const handleButtonClick = () => {
        const inputId = id || uuidv4();
        onButtonClick && onButtonClick(inputId);
    };
    return (
        <div className='option'>
            <TextInput placeholder={placeholder} />
            <button className='button' onClick={handleButtonClick}>{buttonContent ? buttonContent : 'X'}</button>
        </div>
    );
};