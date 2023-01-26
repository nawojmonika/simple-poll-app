import { useOptionsContext } from '../OptionsContext';

export const PollResult = (): JSX.Element => {
    const { votes } = useOptionsContext();
    return (
        <section>
            <span>Total votes: {votes}</span>
        </section>
    );
};