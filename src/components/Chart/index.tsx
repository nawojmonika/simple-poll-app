
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { Option } from '../OptionsContext';

export type ChartData = Required<Pick<Option, 'value' | 'votes'>>;

type Props = {
    data: ChartData[];
    caption: string;
};

const getYScale = (data: ChartData[], yRange: number[]): d3.ScaleLinear<number, number, never> => d3.scaleLinear([0, Math.max(d3.max(d3.map(data, d => d.votes)) || 0 + 5, 10)], yRange);

export const Chart = ({ data, caption }: Props): JSX.Element => {
    const chartContainer = useRef<SVGSVGElement>(null),
        svg = useRef<d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(),
        xAxis = useRef<d3.Selection<SVGGElement, unknown, null, undefined>>(),
        yAxis = useRef<d3.Selection<SVGGElement, unknown, null, undefined>>(),
        bars = useRef<d3.Selection<d3.BaseType | SVGRectElement, ChartData, SVGGElement, unknown> | undefined>(),
        title = useRef<d3.Selection<SVGTextElement, unknown, null, undefined>>(),
        margin = { top: 20, right: 20, bottom: 40, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        xRange = [margin.left, width - margin.right],
        yRange = [height - margin.bottom, margin.top],
        xPadding = 0.1,
        duration = 1000;

    useEffect(() => {
        const xDomain = d3.map(data, d => d.value),
            xScale = d3.scaleBand(xDomain, xRange).padding(xPadding),
            yScale = getYScale(data, yRange);

        xAxis.current?.transition()
            .duration(duration)
            .call(d3.axisBottom(xScale));

        yAxis.current?.call(d3.axisLeft(yScale).ticks(height / 40));

        bars.current?.data(data)
            .join('rect')
            .attr('x', d => (xScale?.(d.value) || 0))
            .attr('y', d => yScale?.(d.votes) || 0)
            .attr('fill', (_, i) => d3.schemeCategory10[i])
            .attr('width', xScale?.bandwidth() || 0)
            .attr('height', d => (yScale?.(0) || 0) - (yScale?.(d.votes) || 0))
        // .transition()
        // .duration(duration)

        title.current?.html(caption)
    }, [data, caption]);

    useEffect(() => {
        svg.current = d3.select(chartContainer.current);
        xAxis.current = xAxis.current || svg.current.append('g').attr('transform', `translate(0,${height - margin.bottom})`);
        yAxis.current = yAxis.current || svg.current.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(getYScale(data, yRange))
                .tickSizeOuter(0)
                .ticks(height / 40))
            .call(g => g.select('.domain').remove())
            .call(g => g.selectAll('.tick line').clone()
                .attr('x2', width - margin.left - margin.right)
                .attr('stroke-opacity', 0.1));
        bars.current = bars.current || svg.current.append('g').selectAll('rect');
        title.current = title.current || svg.current.append('text').attr('y', 15).attr('x', '50%').attr('text-anchor', 'middle').attr('font-size', 16);

        // svg.current?.append("g")
        //     .selectAll("label")
        //     .data(data)
        //     .join('text')
        //     .text(d => d.votes)
        //     .attr('x', d => (xScale?.(d.value) || 0) + ((xScale?.bandwidth() || 0) / 2) - 5)
        //     .attr('y', d => (yScale?.(d.votes) || 0) - 5);

    }, []);

    return (
        <svg ref={chartContainer} width={width} height={height} viewBox={`[0, 0, ${width}, ${height}]`} style={{ maxHeight: '100%', height: 'auto' }} ></svg>
    );
};