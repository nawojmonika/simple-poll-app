import { TextInput } from '../TextInput';
import { OptionInput } from '../OptionInput';
import { useOptionsContext } from '../OptionsContext';
import './PollCreator.css';

export const PollCreator = (): JSX.Element => {
    const { options, removeOption, addOption } = useOptionsContext();

    return (
        <div>
            <TextInput placeholder='What is the question?' />
            <div className='optionList'>
                {options.map((option) => <OptionInput key={option.id} {...option} onButtonClick={removeOption} />)}
                <OptionInput placeholder='Type an answer' buttonContent='Add' onButtonClick={addOption} />
            </div>
        </div>
    );
};