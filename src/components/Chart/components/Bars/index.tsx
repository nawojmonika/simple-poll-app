import { ScaleBand, ScaleLinear } from 'd3';
import { Option } from '../../../OptionsContext';

export type BarData = Required<Pick<Option, 'votes' | 'value'>>;

type Props = {
    data: BarData[];
    height: number;
    scaleX: ScaleBand<string>;
    scaleY: ScaleLinear<number, number, never>;
};

export const Bars = ({ data, height, scaleX, scaleY }: Props): JSX.Element => {
    return (
        <>
            {data.map(({ votes, value }) => (
                <rect
                    key={`bar-${value}`}
                    x={scaleX(value)}
                    y={scaleY(votes)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(votes)}
                    fill="teal"
                />
            ))}
        </>
    );
};