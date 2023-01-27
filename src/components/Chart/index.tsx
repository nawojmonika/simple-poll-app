
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
    const margin = { top: 20, right: 20, bottom: 40, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        xRange = [margin.left, width - margin.right],
        yRange = [height - margin.bottom, margin.top],
        xPadding = 0.1;

    useEffect(() => {
        const X = d3.map(data, d => d.value),
            Y = d3.map(data, d => d.votes),
            xDomain = new d3.InternSet(X),
            yDomain = [0, Math.max(d3.max(Y) || 0 + 5, 10)],
            xScale = d3.scaleBand(xDomain, xRange).padding(xPadding),
            yScale = d3.scaleLinear(yDomain, yRange),
            xAxis = d3.axisBottom(xScale).tickSizeOuter(0),
            yAxis = d3.axisLeft(yScale).ticks(height / 40);

        const svg = d3.select(chartContainer.current);
        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(yAxis)
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line').clone()
                .attr('x2', width - margin.left - margin.right)
                .attr('stroke-opacity', 0.1))
            .call(g => g.append('text')
                .attr('x', -margin.left)
                .attr('y', 10)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'start'));

        svg.append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('fill', (_, i) => d3.schemeCategory10[i])
            .attr('x', d => (xScale(d.value) || 0))
            .attr('y', d => yScale(d.votes))
            .attr('height', d => yScale(0) - yScale(d.votes))
            .attr('width', xScale.bandwidth());

        svg.append("g")
            .selectAll("label")
            .data(data)
            .join('text')
            .text(d => d.votes)
            .attr('x', d => (xScale(d.value) || 0) + (xScale.bandwidth() / 2) - 5)
            .attr('y', d => yScale(d.votes) - 5);

        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(xAxis);

        svg.append('text')
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