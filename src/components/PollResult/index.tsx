import { useMemo, useState } from 'react';
import { Chart, ChartData } from '../Chart';
import { useOptionsContext } from '../OptionsContext';

export const PollResult = (): JSX.Element => {
    const { votes, options, question } = useOptionsContext();
    const chartData = useMemo<ChartData[]>(() => options.map((option) => ({ ...option, value: option.value || option.placeholder || '' })), [options]);

    return (
        <section>
            <Chart data={chartData} caption={question || 'What is the question'} />
            <span>Total votes: {votes}</span>
        </section>
    );
};