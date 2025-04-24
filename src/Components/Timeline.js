import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FaFutbol } from 'react-icons/fa';

const Timeline = ({ currentYear }) => {
  const svgRef = useRef();
  const iconRef = useRef();
  const [prevYear, setPrevYear] = useState(currentYear);
  
  const margin = { top: 40, right: 30, bottom: 40, left: 30 };
  const width = 1000;
  const height = 120;

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create main group
    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scale
    const x = d3.scaleLinear()
      .domain([1900, 2025])
      .range([0, width]);

    // Create axis
    const axis = d3.axisBottom(x)
      .ticks(15)
      .tickFormat(d3.format("d"));

    // Draw axis
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height / 2})`)
      .call(axis)
      .selectAll("path")
      .attr("stroke", "#a58fd5")
      .attr("stroke-width", 2);

    // Style ticks
    g.selectAll(".tick line")
      .attr("stroke", "#a58fd5")
      .attr("stroke-width", 1.5)
      .attr("y2", 6);

    // Draw dashed timeline
    g.append("line")
      .attr("x1", x(1900))
      .attr("x2", x(2025))
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 6)
      .attr("stroke-dasharray", "8,4");

    // Highlight current year text on axis
    g.selectAll(".tick text")
      .filter(d => d === currentYear)
      .attr("fill", "#000")
      .attr("font-weight", "bold");

    // Create year label (will be animated)
    const yearLabel = g.append("text")
      .attr("class", "year-label")
      .attr("x", x(prevYear)) // Start at previous position
      .attr("y", height / 2 - 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("font-size", "14px")
      .text(prevYear);

    // Animate year label to new position
    yearLabel.transition()
      .duration(800) // Animation duration in ms
      .ease(d3.easeCubicOut)
      .attr("x", x(currentYear))
      .text(currentYear);

    // Update previous year for next animation
    setPrevYear(currentYear);

  }, [currentYear]);

  // Calculate icon position with animation
  const iconPosition = {
    left: `${margin.left + (currentYear - 1900) / (2025 - 1900) * width }px`,
    top: `${margin.top + height / 2 - 12 + 15}px`,
    transition: 'left 0.8s cubic-bezier(0.33, 1, 0.68, 1)' // Match D3 transition
  };

  return (
    <div style={{ position: 'relative', borderRadius: '12px', padding: '10px' }}>
      <svg ref={svgRef}></svg>
      {/* Trophy icon with smooth transition */}
      <div 
        ref={iconRef}
        style={{
          position: 'absolute',
          ...iconPosition,
          width: '24px',
          height: '24px',
          color: 'black'
        }}
      >
        <FaFutbol size={12} color="black" />
      </div>
    </div>
  );
};

export default Timeline;