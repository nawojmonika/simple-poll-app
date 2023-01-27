import { axisLeft, ScaleLinear, select } from 'd3';
import { useEffect, useRef } from 'react';

type Props = {
    scale: ScaleLinear<number, number, never>;
};

export const AxisLeft = ({ scale }: Props): JSX.Element => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale]);

    return <g ref={ref} />;
};