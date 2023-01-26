import { TextInput } from '../TextInput';
import { useState } from 'react';
import { OptionInput } from '../OptionInput';
import { useOptionsContext } from '../OptionsContext';
import './PollCreator.css';

export const PollCreator = (): JSX.Element => {
    const { question, options, minOptions, maxOptions, setQuestion, removeOption, addOption, resetOptions } = useOptionsContext();
    const [optionText, setOptionText] = useState<string>('');
    const disableAddition = optionText.length === 0 || options.length === maxOptions;
    const disableRemoval = options.length === minOptions;

    const handleAddOption = (id: string, value: string): void => {
        addOption(id, value);
        setOptionText('');
    };

    return (
        <section>
            <TextInput placeholder='What is the question?' value={question} onChange={setQuestion} />
            <div className='optionList'>
                {options.map((option) => <OptionInput key={option.id} {...option} button={{ disabled: disableRemoval, onClick: removeOption }} />)}
                <OptionInput placeholder='Type an answer' value={optionText} onChange={setOptionText} button={{ content: 'Add', disabled: disableAddition, onClick: handleAddOption }} />
            </div>
            <div>
                <span>{options.length} / {maxOptions} possible answers</span>
                <button onClick={resetOptions}>Reset</button>
            </div>
        </section>
    );
};