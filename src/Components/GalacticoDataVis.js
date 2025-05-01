import React, { useEffect, useRef, useState} from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import * as d3 from "d3";

const barChart_data = [
  {  value: 60, name: "Luís Figo", peakValue: 60},
  {  value: 73.5, name: "Zinedine Zidane", peakValue: 77.5},
  {  value: 45, name: "Ronaldo Nazário", peakValue: 45},
  {  value: 37.5, name: "David Beckham", peakValue: 150},
  {  value: 9, name: "Michael Owen", peakValue: 22},
  {  value: 24, name: "Robinho", peakValue: 34 },
  {  value: 14, name: "Ruud van Nistelrooy", peakValue: 32},
  {  value: 67, name: "Kaká", peakValue: 67},
  {  value: 30, name: "Karim Benzema", peakValue: 60},
  {  value: 94, name: "Cristiano Ronaldo", peakValue: 230},
  {  value: 35.5, name: "Xabi Alonso", peakValue: 35.5},
  {  value: 100, name: "Gareth Bale", peakValue : 100}
];


function createBarChart(container, {width, height}) {

    d3.select(container).selectAll("*").remove();

    const margin = {top: 30, right : 60, bottom : 100, left : 80 }
        const rec_width = width - margin.left - margin.right; 
        const rec_height = height - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append("svg")
        .attr("width", rec_width + margin.top + margin.right)
        .attr("height", rec_height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const x = d3.scaleBand()
      .range([0, rec_width - 10])
      .domain(barChart_data.map(d => d.name))
      .padding(0.05);

    svg.append("g")
      .attr("transform", `translate(0, ${rec_height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    const y = d3.scaleLinear()
      .domain([0, 100.5])
      .range([rec_height,0]); 

    svg.append("g")
      .call(d3.axisLeft(y).ticks(0))
        .selectAll("text")
        .remove();

    svg.selectAll("rect")
    .data(barChart_data)
    .join(
      enter => enter.append("rect")
        .attr("x", d => x(d.name))
        .attr("y", d => y(0)) 
        .attr("width", x.bandwidth())
        .attr("height", 0) 
        .attr("fill", "#E2D999")
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.value))
        .attr("height", d => rec_height - y(d.value)),
  
      update => update
        .transition()
        .duration(800)
        .attr("y", d => y(d.value))
        .attr("height", d => rec_height - y(d.value))
    );
  
    
    svg.selectAll("text.bar_label")
    .data(barChart_data)
    .join(
      enter => enter.append("text")
        .attr("class", "bar_label")
        .attr("x", d => x(d.name) + x.bandwidth() / 2)
        .attr("y", d => y(0))
        .attr("text-anchor", "middle")
        .style("opacity", 0)
        .text(d => d.value)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.value) - 5) 
        .style("opacity", 1),
  
      update => update
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.value) - 5)
        .style("opacity", 1)
    );  

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 50 - margin.left)
      .attr("x", -(rec_height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-weight","bold")
      .text("Market Value in Million €");

    svg.append("text")
      .attr("x", rec_width / 2  )
      .attr("y", (rec_height + 79))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-weight","bold")
      .text("Players");
  
    
    return svg; 
}


const GalacticoVis = () => {

  const barChart = useRef();
  const created = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !created.current) {
          createBarChart(barChart.current, { width: 1300, height: 600 });
          created.current = true;
        }
      });
    });
  
    if (barChart.current) {
      observer.observe(barChart.current);
    }
  
    return () => {};
  }, []);
  

  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        paddingTop: '300px'
      }}>
        <div>
          <h2>Real Madrid's Greatest Vis</h2>
              <div ref={barChart} style={{top:"2%",margin:""}}></div>
        </div>
      </Parallax>
  );
}; 

export default GalacticoVis;