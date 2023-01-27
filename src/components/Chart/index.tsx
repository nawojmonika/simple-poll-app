
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { Option } from '../OptionsContext';

type CharData = Required<Pick<Option, 'value' | 'votes'>>

type Props = {
    data: CharData[];
    caption: string;
    total: number;
};

export const Chart = ({ data, caption, total }: Props): JSX.Element => {
    const chartContainer = useRef<HTMLDivElement>(null);
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
            yDomain = [0, Math.max(total, 10)],
            I = d3.range(X.length).filter(i => xDomain.has(X[i]));

        const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
        const yScale = d3.scaleLinear(yDomain, yRange);
        const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(height / 40);

        const svg = d3.select(chartContainer.current).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');
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
            .attr('fill', 'red')
            .selectAll('rect')
            .data(I)
            .join('rect')
            .attr('x', i => xScale(X[i]) || '')
            .attr('y', i => yScale(Y[i]))
            .attr('height', i => yScale(0) - yScale(Y[i]))
            .attr('width', xScale.bandwidth());

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
            d3.selectAll('svg').remove();
        };

    }, []);


    return (
        <div ref={chartContainer} />
    );
};