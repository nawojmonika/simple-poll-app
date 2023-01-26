import { useState } from 'react';
import { TextInput, TextInputProps } from '../TextInput';
import './PollCreator.css';
import { v4 as uuidv4 } from 'uuid';
import { OptionInput, OptionProps } from '../OptionInput';


const defaultOptions: OptionProps[] = [
    {
        id: uuidv4(),
        placeholder: 'first option',
    },
    {
        id: uuidv4(),
        placeholder: 'second option',
    }
]

export const PollCreator = (): JSX.Element => {
    const [options, setOptions] = useState<OptionProps[]>(defaultOptions);
    return (
        <div>
            <TextInput placeholder='What is the question?' />
            <div className='optionList'>
                {options.map((option) => <OptionInput key={option.id} {...option} />)}
            </div>
        </div>
    );
}