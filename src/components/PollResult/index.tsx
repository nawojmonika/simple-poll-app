import { useMemo } from 'react';
import { Chart, ChartData } from '../Chart';
import { useOptionsContext } from '../OptionsContext';
import styles from './PollResult.module.css';


export const PollResult = (): JSX.Element => {
    const { votes, options, question, questionPlaceholder } = useOptionsContext();
    const chartData = useMemo<ChartData[]>(() => options.map((option) => ({ ...option, value: option.value || option.placeholder || '' })), [options]);

    return (
        <section>
            <Chart data={chartData} caption={question || questionPlaceholder} />
            <div className={styles.total}>Total votes: {votes}</div>
        </section>
    );
};