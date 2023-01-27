import { scaleBand, scaleLinear } from 'd3';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { BarData, Bars } from './components/Bars';


type Props = {
    data: BarData[];
    caption: string;
};

export const Chart = ({ data, caption }: Props): JSX.Element => {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    console.log(width)
    const scaleX = scaleBand()
        .domain(data.map(({ value }) => value))
        .range([0, width]);

    const scaleY = scaleLinear()
        .domain([0, Math.max(...data.map(({ votes }) => votes))])
        .range([height, 0]);

    console.log(data)

    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
                <AxisLeft scale={scaleY} />
                <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
            </g>
        </svg>
    );
}