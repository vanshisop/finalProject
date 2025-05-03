import React, { useEffect, useRef, useState} from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import * as d3 from "d3";

// Import player images
import figoImg from '../img/faces/figo.png';
import zidaneImg from '../img/faces/zidane.png';
import r9Img from '../img/faces/r9.png';
import beckhamImg from '../img/faces/beckham.png';
import robinhoImg from '../img/faces/robinho.png';
import rudd from '../img/faces/rudd.png';
import kakaImg from '../img/faces/kaka.png';
import benzemaImg from '../img/faces/benzema.png';
import cr7Img from '../img/faces/cr7.png';
import alonsoImg from '../img/faces/xabi.png';
import baleImg from '../img/faces/bale.png';

const barChart_data = [
  {  value: 60, name: "Luís Figo", peakValue: 21},
  {  value: 73.5, name: "Zinedine Zidane", peakValue: 35},
  {  value: 45, name: "Ronaldo Nazário", peakValue: 36},
  {  value: 37.5, name: "David Beckham", peakValue: 36},
  {  value: 67, name: "Kaká", peakValue: 36},
  {  value: 94, name: "Cristiano Ronaldo", peakValue: 69.5},
  {  value: 100, name: "Gareth Bale", peakValue : 69.5}
];

const getPlayerImage = (playerName) => {
  switch(playerName) {
    case "Luís Figo": return figoImg;
    case "Zinedine Zidane": return zidaneImg;
    case "Ronaldo Nazário": return r9Img;
    case "David Beckham": return beckhamImg;
    case "Robinho": return robinhoImg;
    case "Ruud van Nistelrooy": return rudd;
    case "Kaká": return kakaImg;
    case "Karim Benzema": return benzemaImg;
    case "Cristiano Ronaldo": return cr7Img;
    case "Xabi Alonso": return alonsoImg;
    case "Gareth Bale": return baleImg;
    default: return null;
  }
};

function createBarChart(container, {width, height}) {

    console.log("Creating bar chart with dimensions");
    d3.select(container).selectAll("*").remove();

    const margin = {top: 40, right: 50, bottom: 110, left: 70};
    const rec_width = width - margin.left - margin.right; 
    const rec_height = height - margin.top - margin.bottom;


    const chartContainer = d3.select(container)
      .append("div")
      .style("border", "2px solid #888")
      .style("border-radius", "8px")
      .style("box-shadow", "0 4px 8px rgba(0,0,0,0.1)")
      .style("background", "#fff")
      .style("padding", "10px")
      .style("margin-bottom", "20px")
      .style("box-sizing", "border-box")
      .style("width", "100%")
      .style("overflow", "hidden");

    const svg = chartContainer
      .append("svg")
        .attr("width", "100%") 
        .attr("height", rec_height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${rec_width + margin.left + margin.right} ${rec_height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    const defs = svg.append("defs");
    const filter = defs.append("filter")
      .attr("height", "130%");
    
    filter.append("feOffset")
      .attr("dx", 3)
      .attr("dy", 3)
      .attr("result", "offsetBlur")
    
    const x = d3.scaleBand()
      .range([0, rec_width])
      .domain(barChart_data.map(d => d.name))
      .padding(0.05);

    svg.append("g")
      .attr("transform", `translate(0, ${rec_height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)") 
        .style("text-anchor", "end") 
        .text(function(d) {
          return d; 
        })
        .attr("dy", "0.5em")
        .attr("y", 10)
        .style("font-size", "10px");
    
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
        .attr("height", d => rec_height - y(d.value))
        .each(function(d) {  
          d3.select(this.parentNode).append("line")
            .attr("x1", x(d.name))
            .attr("x2", x(d.name) + x.bandwidth())
            .attr("y1", y(d.peakValue)) 
            .attr("y2", y(d.peakValue))  
            .attr("stroke", "#000")  
            .attr("stroke-dasharray", "4,4") 
            .attr("stroke-width", 2);
        }),
  
      update => update
        .transition()
        .duration(800)
        .attr("y", d => y(d.value))
        .attr("height", d => rec_height - y(d.value))
    );
    
    const imgSize = Math.min(45, x.bandwidth() * 0.8); 
    
    svg.selectAll("image")
      .data(barChart_data)
      .join("image")
        .attr("xlink:href", d => getPlayerImage(d.name))
        .attr("x", d => x(d.name) + (x.bandwidth() - imgSize) / 2)
        .attr("y", d => y(d.value) + 10) 
        .attr("width", imgSize)
        .attr("height", imgSize)
        .attr("filter", "url(#drop-shadow)") 
        .style("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 100 + 200)
        .style("opacity", 1);
  
    
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
        .attr("y", d => y(d.value) - 10) 
        .style("opacity", 1),
  
      update => update
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("y", d => y(d.value) - 10) 
        .style("opacity", 1)
    );  

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 50 - margin.left)
      .attr("x", -(rec_height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-weight","bold")
      .text("Spending in Million €");

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
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 }); 

  useEffect(() => {

    function handleResize() {
      if (barChart.current) {
     
        const containerWidth = Math.min(1200, window.innerWidth * 0.9);
        const containerHeight = Math.min(600, window.innerHeight * 0.6);
        
        setDimensions({
          width: containerWidth,
          height: containerHeight
        });
      }
    }
 
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !created.current && dimensions.width > 0) {
          createBarChart(barChart.current, dimensions);
          created.current = true;
        } else if (!entry.isIntersecting) {
          created.current = false;
        }
      });
    }, {
      threshold: 0.2 
    });
  
    if (barChart.current) {
      observer.observe(barChart.current);
    }
  
    return () => {
      if (barChart.current) {
        observer.unobserve(barChart.current);
      }
    };
  }, [dimensions]); 

  return (
    <Parallax translateY={[-20, 20]} style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '100%', maxWidth: dimensions.width, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center' }}>Real Madrid's Insane Spending Pedigree</h2>
          <div 
            ref={barChart} 
            style={{
              width: '100%',
              height: dimensions.height,
              maxWidth: '100%',
              margin: '0 auto',
              position: 'relative'
            }}>

            <div style={{ position: "absolute", top: -30, left: 10, fontSize: 12, opacity: 0.5 }}>
              <img src={figoImg} alt="Debug" width="20" height="20" style={{display: "inline-block"}} />
            </div>
            <div>
              <p>The dotted line represents the spending done by an   </p>
            </div>
          </div>
        </div>
      </Parallax>
  );
}; 

export default GalacticoVis;