import { axisBottom, ScaleBand, select } from 'd3';
import { useEffect, useRef } from 'react';

type Props = {
    scale: ScaleBand<string>;
    transform: string;
}

export const AxisBottom = ({ scale, transform }: Props): JSX.Element => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return <g ref={ref} transform={transform} />;
};
