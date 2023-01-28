
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Option } from '../OptionsContext';
import styles from './Chart.module.css';

export type ChartData = Required<Pick<Option, 'value' | 'votes'>>;

type Props = {
    data: ChartData[];
    caption: string;
};

type GSelection = d3.Selection<SVGGElement, unknown, null, undefined>;

type YScale = d3.ScaleLinear<number, number, never>;

const getYScale = (data: ChartData[], yRange: number[]): YScale => d3.scaleLinear([0, Math.max(...data.map(d => (d.votes || 0) + 2), 10)], yRange);

export const Chart = ({ data, caption }: Props): JSX.Element => {
    const chartContainer = useRef<SVGSVGElement>(null),
        svg = useRef<d3.Selection<SVGSVGElement | null, unknown, null, undefined>>(),
        title = useRef<d3.Selection<SVGTextElement, unknown, null, undefined>>(),
        xAxis = useRef<GSelection>(),
        yAxis = useRef<GSelection>(),
        bars = useRef<GSelection>(),
        labels = useRef<GSelection>(),
        margin = { top: 20, right: 20, bottom: 40, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        xRange = [margin.left, width - margin.right],
        yRange = [height - margin.bottom, margin.top],
        duration = 500;

    useEffect(() => {
        const xDomain = d3.map(data, d => d.value),
            xScale = d3.scaleBand(xDomain, xRange),
            yScale = getYScale(data, yRange);
        xAxis.current?.transition()
            .duration(duration)
            .call(d3.axisBottom(xScale));

        yAxis.current?.transition()
            .duration(duration)
            .call(d3.axisLeft(getYScale(data, yRange))
                .tickSizeOuter(0)
                .ticks(height / 40));

        bars.current?.selectAll('rect')
            .data(data)
            .join('rect')
            .transition()
            .duration(duration)
            .attr('x', d => (xScale?.(d.value) || 0))
            .attr('y', d => yScale?.(d.votes) || 0)
            .attr('fill', (_, i) => d3.schemeCategory10[i])
            .attr('width', xScale?.bandwidth() || 0)
            .attr('height', d => (yScale?.(0) || 0) - (yScale?.(d.votes) || 0))

        labels.current?.selectAll('text')
            .data(data)
            .join('text')
            .transition()
            .duration(duration)
            .text(d => d.votes)
            .attr('x', d => (xScale?.(d.value) || 0) + ((xScale?.bandwidth() || 0) / 2) - 5)
            .attr('y', d => (yScale?.(d.votes) || 0) - 5)

        title.current?.html(caption)
    }, [data, caption]);

    useEffect(() => {
        svg.current = d3.select(chartContainer.current);
        xAxis.current = xAxis.current || svg.current.append('g').attr('transform', `translate(0,${height - margin.bottom})`);
        yAxis.current = yAxis.current || svg.current.append('g').attr('transform', `translate(${margin.left},0)`).call(g => g.select('.domain').remove());
        bars.current = bars.current || svg.current.append('g');
        labels.current = labels.current || svg.current.append('g');
        title.current = title.current || svg.current.append('text').attr('y', 15).attr('x', '50%').attr('text-anchor', 'middle').attr('font-size', 16);

    }, []);

    return (
        <div className={styles.container}>
            <svg className={styles.content} ref={chartContainer} viewBox={`0, 0, ${width}, ${height}`} style={{ maxHeight: '100%', height: 'auto' }} ></svg>
        </div>
    );
};