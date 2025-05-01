import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import * as d3 from "d3";

export default function Dominance() {
  const [selectedTeam, setSelectedTeam] = useState('Barcelona');
  const svgRef = useRef(null);
  const teamsData = {
    'Real Madrid': [
      { year: 1943, trophies: 1 },
      { year: 1953, trophies: 6 },
      { year: 1956, trophies: 8 },
      { year: 1960, trophies: 12 },
      { year: 1966, trophies: 16 },
      { year: 1978, trophies: 25 }
    ],
    'Barcelona': [
      { year: 1943, trophies: 0 },
      { year: 1953, trophies: 4 },
      { year: 1956, trophies: 6 },
      { year: 1960, trophies: 8 },
      { year: 1966, trophies: 10 },
      { year: 1978, trophies: 15 }
    ],
    'Atlético Madrid': [
      { year: 1943, trophies: 2 },
      { year: 1953, trophies: 5 },
      { year: 1956, trophies: 7 },
      { year: 1960, trophies: 9 },
      { year: 1966, trophies: 11 },
      { year: 1978, trophies: 13 }
    ],
    'Valencia': [
      { year: 1943, trophies: 1 },
      { year: 1953, trophies: 3 },
      { year: 1956, trophies: 5 },
      { year: 1960, trophies: 7 },
      { year: 1966, trophies: 9 },
      { year: 1978, trophies: 10 }
    ],
    'Athletic Bilbao': [
      { year: 1943, trophies: 3 },
      { year: 1953, trophies: 6 },
      { year: 1956, trophies: 8 },
      { year: 1960, trophies: 9 },
      { year: 1966, trophies: 10 },
      { year: 1978, trophies: 12 }
    ]
  };

  useEffect(() => {
    // Initial render of the chart
    setupChart();
    updateChart("Barcelona");
  }, []);

  // Setup chart once
  const setupChart = () => {
    const margin = { top: 30, right: 30, bottom: 70, left: 100 };
    const width = 1070 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
      .range([0, width])
      .domain(teamsData["Real Madrid"].map(d => d.year))
      .padding(0.2);
    
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");
    
    const yDomain = [0, 30];
    
    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);
    
    g.append("g")
      .attr("class", "myYaxis")
      .call(d3.axisLeft(y));
    
    // Add Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle");
  };

  // Update chart with new data
  const updateChart = (secondTeam) => {
    const margin = { top: 30, right: 30, bottom: 70, left: 100 };
    const width = 1070 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select(svgRef.current);
    const g = svg.select("g");
    
    const x = d3.scaleBand()
      .range([0, width])
      .domain(teamsData["Real Madrid"].map(d => d.year))
      .padding(0.2);
    
    const yDomain = [0, 30];
    
    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);
    
    const line = d3.line()
      .x(d => x(d.year) + x.bandwidth() / 2)
      .y(d => y(d.trophies));
    
    // Update or create Real Madrid path
    g.selectAll(".real-madrid-path")
      .data([teamsData["Real Madrid"]])
      .join(
        enter => enter.append("path")
          .attr("class", "line-path real-madrid-path")
          .attr("fill", "none")
          .attr("stroke", "#2f4f4f")
          .attr("stroke-width", 2)
          .attr("d", line),
        update => update
          .attr("d", line),
        exit => exit.remove()
      );
    
    // Update or create second team path with transition
    g.selectAll(".second-team-path")
      .data([teamsData[secondTeam]])
      .join(
        enter => enter.append("path")
          .attr("class", "line-path second-team-path")
          .attr("fill", "none")
          .attr("stroke", "#708238")
          .attr("stroke-width", 2)
          .attr("d", line),
        update => update.transition().duration(750)
          .attr("d", line),
        exit => exit.remove()
      );
    
    // Update or create Real Madrid data points
    g.selectAll(".real-madrid-points")
      .data(teamsData["Real Madrid"])
      .join(
        enter => enter.append("circle")
          .attr("class", "data-point real-madrid-points")
          .attr("cx", d => x(d.year) + x.bandwidth() / 2)
          .attr("cy", d => y(d.trophies))
          .attr("r", 4)
          .attr("fill", "#2f4f4f"),
        update => update
          .attr("cx", d => x(d.year) + x.bandwidth() / 2)
          .attr("cy", d => y(d.trophies)),
        exit => exit.remove()
      );
    
    // Update or create second team data points with transition
    g.selectAll(".second-team-points")
      .data(teamsData[secondTeam])
      .join(
        enter => enter.append("circle")
          .attr("class", "data-point second-team-points")
          .attr("cx", d => x(d.year) + x.bandwidth() / 2)
          .attr("cy", d => y(d.trophies))
          .attr("r", 4)
          .attr("fill", "#708238"),
        update => update.transition().duration(750)
          .attr("cx", d => x(d.year) + x.bandwidth() / 2)
          .attr("cy", d => y(d.trophies)),
        exit => exit.remove()
      );
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '1rem', 
      minHeight: '100vh' 
    }}>
      <div style={{ 
      marginTop: "100px" 
    }}>Choose the team to compare with:<select 
        id="dropdown" 
        value={selectedTeam} 
        onChange={(e) => {
          setSelectedTeam(e.target.value)
          updateChart(e.target.value)}}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="Barcelona">Barcelona</option>
        <option value="Valencia">Valencia</option>
      </select>
      </div>
    
      <svg 
        ref={svgRef} 
        key="map-svg"
        width="1200"
        height="500"
        style={{ 
          maxWidth: '100%',
          overflow: 'visible' 
        }}
      />
    </div>
    
  );
}