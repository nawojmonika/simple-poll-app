
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { Option } from '../OptionsContext';

type CharData = Required<Pick<Option, 'value' | 'votes'>>;

type Props = {
    data: CharData[];
    caption: string;
};

export const Chart = ({ data, caption }: Props): JSX.Element => {
    const chartContainer = useRef<SVGSVGElement>(null);
    const svg = useRef<d3.Selection<SVGSVGElement | null, unknown, null, undefined>>();
    const xAxis = useRef<d3.Selection<SVGGElement, unknown, null, undefined>>();
    const xScale = useRef<d3.ScaleBand<string>>();
    const margin = { top: 20, right: 20, bottom: 40, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        xRange = [margin.left, width - margin.right],
        yRange = [height - margin.bottom, margin.top],
        xPadding = 0.1;

    useEffect(() => {
        const x = d3.map(data, d => d.value);
        xScale.current?.domain(x);
        xAxis.current?.transition().duration(1000).call(d3.axisBottom(xScale.current!!));
    }, [data])

    useEffect(() => {
        const X = d3.map(data, d => d.value),
            Y = d3.map(data, d => d.votes),
            yDomain = [0, Math.max(d3.max(Y) || 0 + 5, 10)],
            yScale = d3.scaleLinear(yDomain, yRange),
            yAxis = d3.axisLeft(yScale).ticks(height / 40);

        svg.current = d3.select(chartContainer.current);
        xScale.current = d3.scaleBand(X, xRange).padding(xPadding);
        xAxis.current = svg.current.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale.current).tickSizeOuter(0));

        svg.current?.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(yAxis)
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line').clone()
                .attr('x2', width - margin.left - margin.right)
                .attr('stroke-opacity', 0.1))
            .call(g => g.append('text')
                .attr('x', -margin.left)
                .attr('y', 10)
                .attr('text-anchor', 'start'));

        svg.current?.append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('fill', (_, i) => d3.schemeCategory10[i])
            .attr('x', d => (xScale.current?.(d.value) || 0))
            .attr('y', d => yScale(d.votes))
            .attr('height', d => yScale(0) - yScale(d.votes))
            .attr('width', xScale.current?.bandwidth());

        svg.current?.append("g")
            .selectAll("label")
            .data(data)
            .join('text')
            .text(d => d.votes)
            .attr('x', d => (xScale.current?.(d.value) || 0) + ((xScale.current?.bandwidth() || 0) / 2) - 5)
            .attr('y', d => yScale(d.votes) - 5);

        svg.current?.append('text')
            .attr('y', 15)
            .attr('x', '50%')
            .attr('text-anchor', 'middle')
            .attr('font-size', 16)
            .text(caption);

        return () => {
            d3.select('svg > *').remove();
        };
    }, []);

    return (
        <svg ref={chartContainer} width={width} height={height} viewBox={`[0, 0, ${width}, ${height}]`} style={{ maxHeight: '100%', height: 'auto' }} ></svg>
    );
};