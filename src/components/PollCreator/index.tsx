import { useState } from 'react';
import { TextInput, TextInputProps } from '../TextInput';
import './PollCreator.css';
import { v4 as uuidv4 } from 'uuid';

type Option = TextInputProps & {
    id: string;
}

const defaultOptions: Option[] = [
    {
        id: uuidv4(),
        placeholder: 'first option',
    },
    {
        id: uuidv4(),
        placeholder: 'second option',
    }
]

export const PollCreator = () => {
    const [options, setOptions] = useState<Option[]>(defaultOptions);
    return (
        <div>
            <TextInput placeholder='What is the question?' />
            <div className='optionList'>
                {options.map((option) => {
                    return (
                        <div key={option.id} className='option'>
                            <TextInput {...option} />
                            <button>X</button>
                        </div>);
                })}
            </div>
        </div>
    );
}