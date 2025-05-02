import React, { use, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import figo from '../img/figo.jpeg';
import zidane from '../img/zidane.jpeg';
import ronaldoN from '../img/ronaldoN.png'
import beckham from '../img/beckham.jpg'
import ronaldo from '../img/ronaldo.jpg'
import modric from '../img/modric.jpg'

import modricFace from '../img/faces/modric.png';
import cr7 from '../img/faces/cr7.png';
import zlatan from '../img/faces/zlatan.png';
import iniesta from '../img/faces/iniesta.png';
import rooney from '../img/faces/rooney.png';
import bale from '../img/faces/bale.png';
import falcao from '../img/faces/falcao.png';
import villa from '../img/faces/villa.png';
import torres from '../img/faces/torres.png';
import pique from '../img/faces/pique.png';
import messi from '../img/faces/messi.png';
import zidaneFace from '../img/faces/zidane.png';
import * as d3 from "d3";

const modricData = [
  {"player":"Luka Modric","age": 40, "league": "Top league" , img : modricFace},
  { "player": "Cristiano Ronaldo", "age": 38, "league": "Smaller league", img : cr7 },
  { "player": "Zlatan Ibrahimović", "age": 41, "league": "Smaller league", img : zlatan },
  { "player": "Andrés Iniesta", "age": 39, "league": "Smaller league", img : ronaldoN },
  { "player": "Wayne Rooney", "age": 36, "league": "Retired", img : ronaldoN },
  { "player": "Gareth Bale", "age": 34, "league": "Retired", img : bale },
  { "player": "Radamel Falcao", "age": 37, "league": "Smaller league", img : falcao },
  { "player": "David Villa", "age": 39, "league": "Smaller league", img : villa },
  { "player": "Fernando Torres", "age": 39, "league": "Retired", img : torres },
  { "player": "Gerard Piqué", "age": 36, "league": "Retired", img : pique },
  { "player": "Lionel Messi", "age": 38, "league": "Smaller league", img : messi }
]

const zidaneCareerData = [
  { year: 1991, event: "Debut with Cannes" },
  { year: 1992, event: "Move to Bordeaux" },
  { year: 1996, event: "Move to Juventus" },
  { year: 2001, event: "Move to Real Madrid" },
  { year: 2002, event: "UEFA Champions League Win with Real Madrid" },
  { year: 2006, event: "World Cup Final (Golden Ball Award)" },
  { year: 2006, event: "Retirement from Playing" },
  { year: 2016, event: "Return to Real Madrid as Coach" },
  { year: 2017, event: "Champions League Win as Coach" },
  { year: 2021, event: "Leave Real Madrid as Coach" }
];

function createModricScatterPlot(container, {width, height}) {
  d3.select(container).selectAll("*").remove();

  var margin = {top: 80, right: 30, bottom: 120, left: 60},
    rev_width = width - margin.left - margin.right,
    rev_height = height - margin.top - margin.bottom;

  const svg = d3.select(container)
    .append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  const x = d3.scaleBand()
    .domain(["Top league", "Smaller league", "Retired"])
    .range([0, rev_width])
    .padding(0.4);

  const axis = svg.append("g")
    .attr("transform", `translate(0, ${rev_height})`)
    .call(d3.axisBottom(x));


  axis.select(".domain")
  .attr("stroke", "#FF00FF");

  axis.selectAll(".tick line")
    .attr("stroke", "#FF00FF");
  
  axis.selectAll(".tick text")
    .attr("font-size", "15px")
    .attr("fill", "#FF00FF");

  const y = d3.scaleLinear()
    .domain([30, 41])
    .range([rev_height, 0]);

  const yaxis = svg.append("g")
    .call(d3.axisLeft(y).ticks(7))

  yaxis.select(".domain")
    .attr("stroke", "#FF00FF");
  
  yaxis.selectAll(".tick line")
    .attr("stroke", "#FF00FF");
  
  yaxis.selectAll("text")
    .attr("font-size", "15px")
    .attr("fill", "#FF00FF");
    
  // Create patterns for player images
  const defs = svg.append("defs");

  modricData.forEach((d, i) => {
    defs.append("pattern")
      .attr("id", `player-img-${i}`)
      .attr("patternUnits", "objectBoundingBox")
      .attr("width", 1)
      .attr("height", 1)
      .append("image")
      .attr("xlink:href", d.img)  // Fixed: Use d.img instead of d.imageURL
      .attr("width", 100)         // Increased size for better visibility
      .attr("height", 100)        // Increased size for better visibility
      .attr("preserveAspectRatio", "xMidYMid slice");
  });
  
  // Draw circles with player image patterns
  svg.selectAll("circle")
    .data(modricData)
    .enter()
    .append("circle")
    .attr("cx", d => {
      const baseX = x(d.league);
      if (d.player !== "Luka Modric") {
        return baseX + 0.6 * x.bandwidth();
      }
      return baseX + 0.2 * x.bandwidth();
    })
    .attr("cy", d => y(d.age))
    .attr("r", 50)
    .style("fill", (d, i) => `url(#player-img-${i})`) // Added this line to use the patterns
    .style("stroke", "#00FFFF")
    .style("stroke-width", 1);

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#00FFFF")
    .attr("y", 25 - margin.left)
    .attr("x", 10 - (rev_height / 2))
    .text("Age");
}

function createZidaneTimeline(container, {width, height}) {
  d3.select(container).selectAll("*").remove();

  const margin = {top: 50, right: 30, bottom: 30, left: 60};
  const rev_width = width - margin.left - margin.right;
  const rev_height = height - margin.top - margin.bottom;

  // Add a white background container with increased height
  d3.select(container)
    .append("div")
    .style("position", "absolute")
    .style("top", "-50px") // Adjusted to -50px for better visibility
    .style("left", "0")
    .style("width", "100%")
    .style("height", "200%") // Increased height from 150% to 200%
    .style("background-color", "rgba(255, 255, 255, 0.9)") // Back to white with 90% opacity
    .style("border-radius", "8px")
    .style("z-index", "0");

  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "relative")
    .style("z-index", "1")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const zx = d3.scaleLinear()
    .domain([1991, 2021])
    .range([0, rev_width])
    .nice();
  
  // Add a horizontal timeline line in dark color
  svg.append("line")
    .attr("x1", zx(1991))
    .attr("y1", rev_height / 2)
    .attr("x2", zx(2021))
    .attr("y2", rev_height / 2)
    .style("stroke", "#000000") // Black line
    .style("stroke-width", 3)
    .style("stroke-opacity", 1);
    
  // Add year ticks as small vertical lines
  zidaneCareerData.forEach(d => {
    svg.append("line")
      .attr("x1", zx(d.year))
      .attr("y1", rev_height / 2 - 5)
      .attr("x2", zx(d.year))
      .attr("y2", rev_height / 2 + 5)
      .style("stroke", "#000000") // Black tick marks
      .style("stroke-width", 2);
  });
    
  // Increase image size for better visibility
  const imgSize = 50;
  
  // Store references to animated elements for later reset
  const animatedElements = {
    zidaneImage: null,
    label: null,
    yearLabel: null
  };

  // Create image element with a subtle drop shadow
  animatedElements.zidaneImage = svg.append("image")
    .attr("xlink:href", zidaneFace)
    .attr("x", zx(zidaneCareerData[0].year) - imgSize/2)
    .attr("y", rev_height / 2 - imgSize/2)
    .attr("width", imgSize)
    .attr("height", imgSize)
    .style("filter", "drop-shadow(2px 2px 3px rgba(0,0,0,0.5))"); // Darker drop shadow
  
  animatedElements.label = svg.append("text")
    .attr("x", zx(zidaneCareerData[0].year))
    .attr("y", rev_height / 2 - imgSize - 15)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("fill", "#333333") // Dark gray for event text
    .text(zidaneCareerData[0].event);

  animatedElements.yearLabel = svg.append("text")
    .attr("x", zx(zidaneCareerData[0].year))
    .attr("y", rev_height / 2 - imgSize - 45)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "#990000") // Dark red for year
    .text(zidaneCareerData[0].year);

  // Store the animation elements in the container for later access
  container.__animatedElements = animatedElements;

  // Start the animation
  startZidaneAnimation(animatedElements, zx);

  svg.append("g")
    .attr("transform", `translate(0, ${rev_height / 2 + 30})`)
    .call(d3.axisBottom(zx).tickFormat(d3.format("d")))
    .selectAll("text")
    .style("font-weight", "bold")
    .style("font-size", "16px")
    .style("fill", "#000000"); // Black text for years on axis

  svg.append("text")
    .attr("x", rev_width / 2)
    .attr("y", rev_height)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .style("fill", "#000066") // Dark blue for title
    .text("Zinedine Zidane's Career Timeline");
}

function startZidaneAnimation(elements, zx) {
  if (elements.zidaneImage) elements.zidaneImage.interrupt();
  if (elements.label) elements.label.interrupt();
  if (elements.yearLabel) elements.yearLabel.interrupt();
  

  elements.zidaneImage
    .attr("x", zx(zidaneCareerData[0].year) - 25);
  
  elements.label
    .attr("x", zx(zidaneCareerData[0].year))
    .text(zidaneCareerData[0].event);
    
  elements.yearLabel
    .attr("x", zx(zidaneCareerData[0].year))
    .text(zidaneCareerData[0].year);

  zidaneCareerData.forEach((d, i) => {
    elements.zidaneImage.transition()
      .delay(i * 1000)
      .duration(1500)
      .attr("x", zx(d.year) - 25);
      
    elements.label.transition()
      .delay(i * 1000)
      .duration(1000)
      .attr("x", zx(d.year))
      .text(d.event);
      
    elements.yearLabel.transition()
      .delay(i * 1000)
      .duration(1000)
      .attr("x", zx(d.year))
      .text(d.year);
  });
}

gsap.registerPlugin(ScrollTrigger);

const Santiago = () => {
  const sectionRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const bg4Ref = useRef(null);
  const bg5Ref = useRef(null);
  const modricRef = useRef(null);
  const [modricVis1, setmodricVis1] = useState(false);
  const zidaneTimeline = useRef(null);
  const isZidaneVisible = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section during scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      });

      // Step 1: bg1 visible, bg2 invisible
      gsap.set(bg1Ref.current, { opacity: 1 });
      gsap.set(bg2Ref.current, { opacity: 0 });
      gsap.set(bg3Ref.current, { opacity: 0 });
      gsap.set(bg4Ref.current, { opacity: 0 });
      gsap.set(bg5Ref.current, { opacity: 0 });
      // Step 2: Transition from bg1 to bg2
      tl.to(bg1Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg2Ref.current, { opacity: 1, duration: 2 }, "<"); 

      tl.to(bg2Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg3Ref.current, { opacity: 1, duration: 2 }, "<"); 

      tl.to(bg3Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg4Ref.current, { opacity: 1, duration: 2 }, "<");

      tl.to(bg4Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg5Ref.current, { opacity: 1, duration: 2 }, "<");

      // Enhanced ScrollTrigger for bg2/zidane with enter/leave callbacks
      ScrollTrigger.create({
        trigger: bg2Ref.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Restart animation when entering view
          if (zidaneTimeline.current && zidaneTimeline.current.__animatedElements) {
            startZidaneAnimation(
              zidaneTimeline.current.__animatedElements, 
              d3.scaleLinear()
                .domain([1991, 2021])
                .range([0, window.innerWidth - 200])
                .nice()
            );
          }
          isZidaneVisible.current = true;
        },
        onLeave: () => {
          isZidaneVisible.current = false;
        },
        onEnterBack: () => {
          // Also restart animation when scrolling back up into view
          if (zidaneTimeline.current && zidaneTimeline.current.__animatedElements) {
            startZidaneAnimation(
              zidaneTimeline.current.__animatedElements, 
              d3.scaleLinear()
                .domain([1991, 2021])
                .range([0, window.innerWidth - 200])
                .nice()
            );
          }
          isZidaneVisible.current = true;
        },
        onLeaveBack: () => {
          isZidaneVisible.current = false;
        }
      });

    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    createModricScatterPlot(modricRef.current, {width:800, height:900});
    setmodricVis1(true);
  }, []);

  useEffect(() => {
    if (zidaneTimeline.current) {
      createZidaneTimeline(zidaneTimeline.current, { width: window.innerWidth, height: 300 });
    }
  }, []);

  
  return (
    <div ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* First Background */}
      <div ref={bg1Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${figo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 1,
      }} />

      {/* Second Background */}
      <div ref={bg2Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${zidane})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 2,
      }} >
            <div
              ref={zidaneTimeline}
              style={{
                position: 'absolute',
                bottom: '5%',
                left: '0%',
                right: '5%',
                height: '100px',
                width:'100%',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                transform: 'translateY(50px)',
                zIndex: 10,
                opacity: 1,
                padding: '20px',
                boxSizing: 'border-box'
              }}
            >
            </div>
        </div>

    < div ref={bg3Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${ronaldoN})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 3,
      }} />

    <div ref={bg4Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${beckham})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 4, 
      }} />

      <div ref={bg5Ref} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundImage: `url(${modric})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundSize:"120%",
            backgroundPositionX:"10%",
            zIndex: 5,
          }} >
          <div ref={modricRef} style={{zIndex: 6, opacity:"200%"}}></div>
          </div>
    </div>
  );
};

export default Santiago;