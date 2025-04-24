import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Trophies = ({
  currentYear,
  circletrophy1,
  circletrophy2,
  circletrophy3,
  showTrophy1,
  showTrophy2,
  showTrophy3,
  trophy1Count,
  trophy2Count,
  trophy3Count
}) => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", 200)
      .attr("height", 100)
      .style("background", "transparent");

    // Trophy data with smaller dimensions
    const trophies = [
      { id: 1, x: 40, y: 50, color: "#FFD700", circle: circletrophy1, show: showTrophy1 }, // Gold
      { id: 2, x: 100, y: 50, color: "#C0C0C0", circle: circletrophy2, show: showTrophy2 }, // Silver
      { id: 3, x: 160, y: 50, color: "#CD7F32", circle: circletrophy3, show: showTrophy3 }  // Bronze
    ];

    // Draw trophies based on showTrophy variables
    trophies.forEach(trophy => {
      if (trophy.show) {
        const group = svg.append("g")
          .attr("transform", `translate(${trophy.x},${trophy.y})`);

        // Draw a red circle around the trophy if circletrophy is true
        if (trophy.circle) {
          group.append("circle")
            .attr("r", 25)
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "transparent")
            .attr("stroke", "red")
            .attr("stroke-width", 2);
        }

        // Always draw the cup-shaped trophy (regardless of circletrophy value)
        group.append("path")
          .attr("d", "M -12 -20 L 0 -30 L 12 -20 L 10 -20 L 10 15 L -10 15 L -10 -20 Z")
          .attr("fill", trophy.color)
          .attr("stroke", "#000")
          .attr("stroke-width", 0.8);

        // Draw trophy base
        group.append("rect")
          .attr("x", -15)
          .attr("y", 15)
          .attr("width", 30)
          .attr("height", 6)
          .attr("fill", trophy.color)
          .attr("stroke", "#000")
          .attr("stroke-width", 0.8);

        // Draw trophy count text
        group.append("text")
          .attr("class", `trophy-count-${trophy.id}`)
          .attr("text-anchor", "middle")
          .attr("y", -35)
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .text("0");
      }
    });

    // Animate counts when currentYear changes
    if (currentYear) {
      const targetCounts = {
        1: trophy1Count,
        2: trophy2Count,
        3: trophy3Count
      };

      trophies.forEach(trophy => {
        if (trophy.show) {
          d3.select(svgRef.current)
            .select(`.trophy-count-${trophy.id}`)
            .transition()
            .duration(1500)
            .tween("text", function() {
              const selection = d3.select(this);
              const start = 0;
              const end = targetCounts[trophy.id];
              const interpolator = d3.interpolateNumber(start, end);
              return function(t) {
                selection.text(Math.floor(interpolator(t)));
              };
            });
        }
      });
    }
  }, [currentYear, circletrophy1, circletrophy2, circletrophy3, showTrophy1, showTrophy2, showTrophy3]);

  return (
    <div style={{ margin: '10px', textAlign: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Trophies;