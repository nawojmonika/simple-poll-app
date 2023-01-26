import { Chart } from '../Chart';
import { useOptionsContext } from '../OptionsContext';

export const PollResult = (): JSX.Element => {
    const { votes, options, question } = useOptionsContext();
    const chartData = options.map((option) => ({ ...option, value: option.placeholder || option.value }))
    return (
        <section>
            <Chart data={chartData} caption={question} />
            <span>Total votes: {votes}</span>
        </section>
    );
};