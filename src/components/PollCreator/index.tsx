import { useState } from 'react';
import { TextInput, TextInputProps } from '../TextInput';
import './PollCreator.css';

const defaultOptions: TextInputProps[] = [
    {
        placeholder: 'first option',
    },
    {
        placeholder: 'second option',
    }
]

export const PollCreator = () => {
    const [options, setOptions] = useState<TextInputProps[]>(defaultOptions);
    return (
        <div>
            <TextInput placeholder='What is the question?' />
            <div className='optionList'>
                {options.map((option) => {
                    return (
                        <div className='option'>
                            <TextInput {...option} />
                            <button>X</button>
                        </div>);
                })}
            </div>
        </div>
    );
}