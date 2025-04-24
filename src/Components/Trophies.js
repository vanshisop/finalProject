import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// Import trophy images with correct paths
import laliga from '../img/laliga.png';
import uefa from '../img/uefa.png';
import copa from '../img/copa.png';

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
  
  // Store previous trophy counts to detect changes
  const prevCountsRef = useRef({ trophy1: 0, trophy2: 0, trophy3: 0 });

  useEffect(() => {
    // Clear SVG contents
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", 240) 
      .attr("height", 150) 
      .style("background", "transparent");

    // Define trophy data
    const trophies = [
      { id: 1, x: 55, y: 70, circle: circletrophy1, show: showTrophy1, image: laliga, count: trophy1Count },
      { id: 2, x: 120, y: 70, circle: circletrophy2, show: showTrophy2, image: uefa, count: trophy2Count }, 
      { id: 3, x: 185, y: 70, circle: circletrophy3, show: showTrophy3, image: copa, count: trophy3Count }  
    ];

    // Create filters
    // Shadow filter
    svg.append("defs")
      .append("filter")
      .attr("id", "trophy-shadow")
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "2")
      .attr("stdDeviation", "2")
      .attr("flood-opacity", "0.3");
      
    // Golden glow
    const glowFilter = svg.append("defs")
      .append("filter")
      .attr("id", "trophy-glow")
      .attr("x", "-40%")
      .attr("y", "-40%")
      .attr("width", "180%")
      .attr("height", "180%");
      
    glowFilter.append("feGaussianBlur")
      .attr("in", "SourceGraphic")
      .attr("stdDeviation", "3")
      .attr("result", "blur");
      
    glowFilter.append("feFlood")
      .attr("flood-color", "gold")
      .attr("flood-opacity", "0.7")
      .attr("result", "color");
      
    glowFilter.append("feComposite")
      .attr("in", "color")
      .attr("in2", "blur")
      .attr("operator", "in")
      .attr("result", "glow");
      
    glowFilter.append("feMerge")
      .selectAll("feMergeNode")
      .data(["glow", "SourceGraphic"])
      .enter()
      .append("feMergeNode")
      .attr("in", d => d);

    // Render each trophy
    trophies.forEach(trophy => {
      if (trophy.show) {
        const group = svg.append("g")
          .attr("transform", `translate(${trophy.x},${trophy.y})`);

        //  circular border behind the trophy
        group.append("circle")
          .attr("r", 32)
          .attr("fill", "white")
          .attr("stroke", "goldenrod")
          .attr("stroke-width", 2)
          .style("filter", "url(#trophy-shadow)");

        //  trophy image
        const trophyImage = group.append("image")
          .attr("xlink:href", trophy.image)
          .attr("x", -30)
          .attr("y", -30)
          .attr("width", 60)
          .attr("height", 60)
          .attr("preserveAspectRatio", "xMidYMid meet")
          .style("filter", "url(#trophy-shadow)");

        //  trophy count text
        group.append("text")
          .attr("class", `trophy-count-${trophy.id}`)
          .attr("text-anchor", "middle")
          .attr("y", -40)
          .attr("font-size", "18px")
          .attr("font-weight", "bold")
          .text(trophy.count);
          
        // Trophy name
        group.append("text")
          .attr("text-anchor", "middle")
          .attr("y", 42)  
          .attr("font-size", "10px")  
          .attr("fill", "#333")
          .text(trophy.id === 1 ? "La Liga" : 
                trophy.id === 2 ? "UEFA CL" : 
                "Copa del Rey");
        
        // Check if count has increased for this trophy
        const hasCountIncreased = currentYear && 
          (trophy.id === 1 && trophy1Count > prevCountsRef.current.trophy1 ||
           trophy.id === 2 && trophy2Count > prevCountsRef.current.trophy2 ||
           trophy.id === 3 && trophy3Count > prevCountsRef.current.trophy3);
        
        if ((trophy.circle && currentYear) || hasCountIncreased) {
          // Pulse animation
          trophyImage
            .transition()
            .duration(400)
            .style("filter", "url(#trophy-glow)")
            .attr("width", 70)
            .attr("height", 70)
            .attr("x", -35)
            .attr("y", -35)
            .transition()
            .duration(400)
            .style("filter", "url(#trophy-shadow)")
            .attr("width", 60)
            .attr("height", 60)
            .attr("x", -30)
            .attr("y", -30);
          
          if (currentYear) {
            const startValue = trophy.id === 1 ? prevCountsRef.current.trophy1 :
                             trophy.id === 2 ? prevCountsRef.current.trophy2 : 
                             prevCountsRef.current.trophy3;
            
            group.select(`.trophy-count-${trophy.id}`)
              .transition()
              .duration(1500)
              .tween("text", function() {
                const selection = d3.select(this);
                const end = trophy.count;
                const interpolator = d3.interpolateNumber(startValue, end);
                return function(t) {
                  selection.text(Math.floor(interpolator(t)));
                };
              });
          }
        }
      }
    });

    // Update previous counts reference
    prevCountsRef.current = {
      trophy1: trophy1Count,
      trophy2: trophy2Count,
      trophy3: trophy3Count
    };
    
  }, [currentYear, circletrophy1, circletrophy2, circletrophy3, showTrophy1, showTrophy2, showTrophy3, trophy1Count, trophy2Count, trophy3Count]);

  return (
    <div style={{ margin: '10px', textAlign: 'center' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Trophies;