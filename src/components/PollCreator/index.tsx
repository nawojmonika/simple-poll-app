import { TextInput } from '../TextInput';
import { useState } from 'react';
import { OptionInput } from '../OptionInput';
import { useOptionsContext } from '../OptionsContext';
import { Button } from '../Button';
import styles from './PollCreator.module.css';

export const PollCreator = (): JSX.Element => {
    const { question, questionPlaceholder, options, minOptions, maxOptions, setQuestion, removeOption, addOption, changeOption, resetOptions } = useOptionsContext();
    const [optionText, setOptionText] = useState<string>('');
    const disableAddition = options.length === maxOptions;
    const disableRemoval = options.length === minOptions;
    const counter = `${options.length} / ${maxOptions} possible answers`;

    const handleOptionTextChange = (id: string, value: string): void => {
        setOptionText(value);
    };

    const handleAddOption = (id: string, value: string): void => {
        if (value.length > 0) {
            addOption(id, value);
            setOptionText('');
        }
    };

    return (
        <section className={styles.container}>
            <TextInput placeholder={questionPlaceholder} value={question} onChange={setQuestion} />
            <div className={styles.optionList}>
                {options.map((option) => <OptionInput testId='poll-creator-option' key={option.id} {...option} onChange={changeOption} button={{ type: 'danger', disabled: disableRemoval, onClick: removeOption }} />)}
                <OptionInput testId='poll-creator-add-option' placeholder='Type an answer' value={optionText} onChange={handleOptionTextChange} onEnter={handleAddOption} disabled={disableAddition} button={{ content: 'Add', disabled: disableAddition, onClick: handleAddOption }} />
            </div>
            <div className={styles.footer}>
                <span>{counter}</span>
                <Button testId='poll-creator-reset' type={'warning'} onClick={resetOptions} big>Reset</Button>
            </div>
        </section>
    );
};