import { useOptionsContext } from '../OptionsContext';
import './RadioButtonGroup.css';

export const RadioButtonGroup = (): JSX.Element => {
    const { question, options } = useOptionsContext();
    const header = question || 'What is the question?';
    return (
        <section>
            <h2>{header}</h2>
            {options.map(({ id, value, placeholder }) => {
                const inputValue = value || placeholder;
                return (
                    <div key={id} className='radioInput'>
                        <input type='radio' name={header} id={id} value={inputValue} />
                        <label htmlFor={id}>{inputValue}</label>
                    </div>
                );
            })}
            <button>Vote</button>
        </section>
    );
}