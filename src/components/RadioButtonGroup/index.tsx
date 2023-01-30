import { ChangeEvent } from 'react';
import { Option } from '../OptionsContext';
import styles from './RadioButtonGroup.module.css';

type Props = {
    name: string;
    options: Option[];
    onChange: (id: string) => void;
};

export const RadioButtonGroup = ({ name, options, onChange }: Props): JSX.Element => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.id);
    };
    return (
        <>
            {options.map(({ id, value, placeholder }) => {
                const inputValue = value || placeholder;
                return (
                    <div key={id} className={styles.input} onChange={handleChange}>
                        <input type='radio' name={name} id={id} value={inputValue} />
                        <label htmlFor={id}>{inputValue}</label>
                    </div>
                );
            })}
        </>
    );
};