import { ChangeEvent, useState } from 'react';
import { Button } from '../Button';
import { useOptionsContext } from '../OptionsContext';
import styles from './RadioButtonGroup.module.css';

export const RadioButtonGroup = (): JSX.Element => {
    const [currentOptionId, setCurrentOptionId] = useState<string>('');
    const { question, questionPlaceholder, options, voteForOption } = useOptionsContext();
    const header = question || questionPlaceholder;

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setCurrentOptionId(event.target.id);
    };

    const handleVote = (): void => {
        voteForOption(currentOptionId);
    };

    return (
        <section>
            <div>
                <h2>{header}</h2>
                {options.map(({ id, value, placeholder }) => {
                    const inputValue = value || placeholder;
                    return (
                        <div key={id} className={styles.radioInput} onChange={handleChange}>
                            <input type='radio' name={header} id={id} value={inputValue} />
                            <label htmlFor={id}>{inputValue}</label>
                        </div>
                    );
                })}
            </div>
            <Button className={styles.button} onClick={handleVote} disabled={currentOptionId.length === 0} big>Vote</Button>
        </section>
    );
}