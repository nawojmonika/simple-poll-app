import { TextInput } from '../TextInput';
import { useState } from 'react';
import { OptionInput } from '../OptionInput';
import { useOptionsContext } from '../OptionsContext';
import styles from './PollCreator.module.css';
import { Button } from '../Button';

export const PollCreator = (): JSX.Element => {
    const { question, questionPlaceholder, options, minOptions, maxOptions, setQuestion, removeOption, addOption, changeOption, resetOptions } = useOptionsContext();
    const [optionText, setOptionText] = useState<string>('');
    const disableAddition = optionText.length === 0 || options.length === maxOptions;
    const disableRemoval = options.length === minOptions;

    const handleOptionTextChange = (id: string, value: string): void => {
        setOptionText(value);
    };

    const handleAddOption = (id: string, value: string): void => {
        if (!disableAddition) {
            addOption(id, value);
            setOptionText('');
        }
    };

    return (
        <section className={styles.container}>
            <TextInput placeholder={questionPlaceholder} value={question} onChange={setQuestion} />
            <div className={styles.optionList}>
                {options.map((option) => <OptionInput key={option.id} {...option} onChange={changeOption} button={{ type: 'danger', disabled: disableRemoval, onClick: removeOption }} />)}
                <OptionInput placeholder='Type an answer' value={optionText} onChange={handleOptionTextChange} onEnter={handleAddOption} button={{ content: 'Add', disabled: disableAddition, onClick: handleAddOption }} />
            </div>
            <div className={styles.footer}>
                <span>{options.length} / {maxOptions} possible answers</span>
                <Button type={'warning'} onClick={resetOptions} big>Reset</Button>
            </div>
        </section>
    );
};