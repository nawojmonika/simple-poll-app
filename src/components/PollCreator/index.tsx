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
];

export const PollCreator = (): JSX.Element => {
    const [options, setOptions] = useState<OptionProps[]>(defaultOptions);

    const handleAddOption = (id: string, value: string): void => {
        setOptions([...options, { id, value }])
    };

    const handleRemoveOption = (id: string): void => {
        const filteredOptions = options.filter((option) => option.id !== id);
        setOptions(filteredOptions);
    }

    return (
        <div>
            <TextInput placeholder='What is the question?' />
            <div className='optionList'>
                {options.map((option) => <OptionInput key={option.id} {...option} onButtonClick={handleRemoveOption} />)}
                <OptionInput placeholder='Type an answer' buttonContent='Add' onButtonClick={handleAddOption} />
            </div>
        </div>
    );
};