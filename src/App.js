import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import './App.css';

export default function App() {
  const [data] = useState([25, 50, 35, 15, 94, 10]);
  const svgRef = useRef();

  useEffect(() => {
    // set up the svg
    const w = 400;
    const h = 100;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background-color', '#fff')
      .style('margin-top', '30')
      .style('margin-right', '30')
      .style('margin-left', '35')
      .style('margin-bottom', '30')
      .style('overflow', 'visible');

    // set up the scaling (range of the values of the chart)
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // set up the axis
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`)
      .style('color', '#838895');
    svg.append('g').call(yAxis).style('color', '#838895');

    // set up the data
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', '#684df5');
  }, [data]);

  return (
    <div className="App">
      <div className="wrapper">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}
