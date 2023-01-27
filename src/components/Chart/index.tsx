
import * as d3 from 'd3';
import { drag, scaleBand, scaleLinear } from 'd3';
import { useEffect, useRef } from 'react';
import { Option } from '../OptionsContext';

type CharData = Required<Pick<Option, 'value' | 'votes'>>

type Props = {
    data: CharData[];
    caption: string;
    total: number;
};

export const Chart = ({ data, caption, total }: Props): JSX.Element => {
    const svgElement = useRef<SVGSVGElement>(null);
    const margin = { top: 20, right: 20, bottom: 40, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(svgElement.current).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");;
        const scaleX = scaleBand()
            .domain(data.map(({ value }) => value))
            .range([0, width]);
        const scaleY = scaleLinear()
            .domain([0, Math.max(total, 10)])
            .range([height, 0]);

        svg.append("g").attr('transform', `translate(0, ${height})`).call(d3.axisBottom(scaleX));
        svg.append("g").call(d3.axisLeft(scaleY));

    }, []);


    return (
        <svg
            ref={svgElement}
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
        </svg >
    );
}