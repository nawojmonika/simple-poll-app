import { TextInput } from '../TextInput';
import { OptionInput } from '../OptionInput';
import { useOptionsContext } from '../OptionsContext';
import './PollCreator.css';

export const PollCreator = (): JSX.Element => {
    const { question, options, minOptions, maxOptions, setQuestion, removeOption, addOption, resetOptions } = useOptionsContext();
    const disableAddition = options.length === maxOptions;
    const disableRemoval = options.length === minOptions;

    return (
        <section>
            <TextInput placeholder='What is the question?' value={question} onChange={setQuestion} />
            <div className='optionList'>
                {options.map((option) => <OptionInput key={option.id} {...option} button={{ disabled: disableRemoval, onClick: removeOption }} />)}
                <OptionInput placeholder='Type an answer' disabled={disableAddition} button={{ content: 'Add', disabled: disableAddition, onClick: addOption }} />
            </div>
            <div>
                <span>{options.length} / {maxOptions} possible answers</span>
                <button onClick={resetOptions}>Reset</button>
            </div>
        </section>
    );
};