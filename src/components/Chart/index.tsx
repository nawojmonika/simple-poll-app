import { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { Option } from '../OptionsContext';

type Props = {
    data: Option[];
    caption: string;
};

export const Chart = ({ data, caption }: Props): JSX.Element => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const barChart = Plot.plot({
            caption,
            marks: [
                Plot.barY(data, {
                    x: "value",
                    y: "votes",
                })],
            y: {
                grid: true
            },
            marginLeft: 50,
            marginTop: 50,
            marginBottom: 50
        });
        container?.current && container?.current.append(barChart);
        return () => {
            barChart.remove();
        }
    }, [container, data])
    return (
        <div ref={container}></div>
    );
}