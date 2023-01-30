import { useMemo } from 'react';
import { Chart, ChartData } from '../Chart';
import { useOptionsContext } from '../OptionsContext';
import styles from './PollResult.module.css';


export const PollResult = (): JSX.Element => {
    const { options, question, questionPlaceholder } = useOptionsContext();
    const chartData = useMemo<ChartData[]>(() => options.map((option) => ({ ...option, value: option.value || option.placeholder || '' })), [options]);
    const votes = useMemo<number>(() => options.reduce((previous, current) => previous + current.votes, 0), [options]);
    const total = `Total votes: ${votes}`;
    return (
        <section>
            <Chart data={chartData} caption={question || questionPlaceholder} />
            <div className={styles.total}>{total}</div>
        </section>
    );
};