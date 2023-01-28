
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { Option } from '../OptionsContext';

type ChartData = Required<Pick<Option, 'value' | 'votes'>>;

type Props = {
    data: ChartData[];
    caption: string;
};

type Bars = d3.Selection<d3.BaseType | SVGRectElement, ChartData, SVGGElement, unknown> | undefined;
type XScale = d3.ScaleBand<string> | undefined;
type YScale = d3.ScaleLinear<number, number, never> | undefined;

const getYDomain = (data: ChartData[]): number[] => [0, Math.max(d3.max(d3.map(data, d => d.votes)) || 0 + 5, 10)];

export const Chart = ({ data, caption }: Props): JSX.Element => {
    const chartContainer = useRef<SVGSVGElement>(null),
        svg = useRef<d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(),
        xAxis = useRef<d3.Selection<SVGGElement, unknown, null, undefined>>(),
        yAxis = useRef<d3.Selection<SVGGElement, unknown, null, undefined>>(),
        xScale = useRef<XScale>(),
        yScale = useRef<YScale>(),
        bars = useRef<Bars>(),
        margin = { top: 20, right: 20, bottom: 40, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        xRange = [margin.left, width - margin.right],
        yRange = [height - margin.bottom, margin.top],
        xPadding = 0.1,
        duration = 1000;

    useEffect(() => {
        xScale.current?.domain(d3.map(data, d => d.value));
        xAxis.current?.transition().duration(duration).call(d3.axisBottom(xScale.current!!));
        yScale.current?.domain(getYDomain(data));
        // yAxis.current?.transition().duration(duration).call(d3.axisLeft(yScale.current!!));

        bars.current?.data(data)
            .join('rect')
            .attr('x', d => (xScale.current?.(d.value) || 0))
            .attr('y', d => yScale.current?.(d.votes) || 0)
            .attr('width', xScale.current?.bandwidth() || 0)
            .attr('height', d => (yScale.current?.(0) || 0) - (yScale.current?.(d.votes) || 0))
            .transition()
            .duration(duration)
            .attr('fill', (_, i) => d3.schemeCategory10[i]);
    }, [data]);

    useEffect(() => {
        svg.current = d3.select(chartContainer.current);
        xScale.current = d3.scaleBand(d3.map(data, d => d.value), xRange).padding(xPadding);
        xAxis.current = svg.current.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale.current).tickSizeOuter(0));

        yScale.current = d3.scaleLinear(getYDomain(data), yRange);
        yAxis.current = svg.current?.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale.current).ticks(height / 40))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line').clone()
                .attr('x2', width - margin.left - margin.right)
                .attr('stroke-opacity', 0.1))
            .call(g => g.append('text')
                .attr('x', -margin.left)
                .attr('y', 10)
                .attr('text-anchor', 'start'));

        bars.current = svg.current?.append('g').selectAll('rect');

        // svg.current?.append("g")
        //     .selectAll("label")
        //     .data(data)
        //     .join('text')
        //     .text(d => d.votes)
        //     .attr('x', d => (xScale.current?.(d.value) || 0) + ((xScale.current?.bandwidth() || 0) / 2) - 5)
        //     .attr('y', d => (yScale.current?.(d.votes) || 0) - 5);

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