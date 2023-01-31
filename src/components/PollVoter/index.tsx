import { useState } from 'react';
import { Button } from '../Button';
import { useOptionsContext } from '../OptionsContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import styles from './PollVoter.module.css';

export const PollVoter = (): JSX.Element => {
    const [currentOptionId, setCurrentOptionId] = useState<string>('');
    const { question, questionPlaceholder, options, voteForOption } = useOptionsContext();
    const header = question || questionPlaceholder;

    const handleVote = (): void => {
        voteForOption(currentOptionId);
    };

    return (
        <section>
            <div>
                <h2 className={styles.header}>{header}</h2>
                <RadioButtonGroup name={header} options={options} onChange={setCurrentOptionId} />
            </div>
            <Button testId='poll-voter-button' className={styles.button} onClick={handleVote} disabled={currentOptionId.length === 0} big>Vote</Button>
        </section>
    );
};