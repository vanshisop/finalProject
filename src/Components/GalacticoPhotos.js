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
import bale from '../img/faces/bale.png';
import falcao from '../img/faces/falcao.png';
import villa from '../img/faces/villa.png';
import torres from '../img/faces/torres.png';
import pique from '../img/faces/pique.png';
import messi from '../img/faces/messi.png';
import zidaneFace from '../img/faces/zidane.png';
import ronaldoNFace from '../img/faces/r9.png';
import figoFace from '../img/faces/figo.png';
import ronaldoFace from '../img/faces/cr7.png';
import beckhamFace from '../img/faces/beckham.png';
import * as d3 from "d3";



const modricData = [
  {"player":"Luka Modric","age": 40, "league": "Top league" , img : modricFace},
  { "player": "Cristiano Ronaldo", "age": 38, "league": "Smaller league", img : cr7 },
  { "player": "Zlatan Ibrahimović", "age": 41, "league": "Smaller league", img : zlatan },
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


const ronaldoNCareerData = [
  { year: 1993, event: "Professional debut with Cruzeiro" },
  { year: 1994, event: "Move to PSV Eindhoven" },
  { year: 1996, event: "Transfer to FC Barcelona" },
  { year: 1997, event: "Transfer to Inter Milan" },
  { year: 1998, event: "FIFA World Cup Finalist (Golden Ball winner)" },
  { year: 2002, event: "FIFA World Cup Winner , Golden Boot and Move to Real Madrid" },
  { year: 2007, event: "Transfer to AC Milan" },
  { year: 2009, event: "Return to Brazil with Corinthians" },
  { year: 2011, event: "Retirement from Professional Football" }
];

const beckhamCareerData = [
  { year: 1992, event: "Professional debut with Manchester United" },
  { year: 1996, event: "Establishes himself at Man United, wins PFA Young Player of the Year" },
  { year: 1999, event: "Treble win with Manchester United" },
  { year: 2003, event: "Transfer to Real Madrid" },
  { year: 2007, event: "Move to LA Galaxy" },
  { year: 2009, event: "Loan to AC Milan" },
  { year: 2013, event: "Short stint at PSG and Retirement from Football" }
];

const figoCareerData = [
  { year: 1995, event: "Transfer to FC Barcelona" },
  { year: 1997, event: "Wins UEFA Cup Winners' Cup with Barcelona" },
  { year: 2000, event: "Controversial transfer to Real Madrid" },
  { year: 2001, event: "Wins FIFA World Player of the Year" },
  { year: 2005, event: "Transfer to Inter Milan" },
  { year: 2009, event: "Retirement from Professional Football" }
];

const ronaldoCareerData = [
  { year: 2002, event: "Professional debut with Sporting CP" },
  { year: 2003, event: "Transfer to Manchester United" },
  { year: 2008, event: "Wins Ballon d'Or and Champions League with Man United" },
  { year: 2009, event: "Record transfer to Real Madrid" },
  { year: 2013, event: "Wins second Ballon d'Or" },
  { year: 2016, event: "Wins Euro 2016 with Portugal" },
  { year: 2018, event: "Transfer to Juventus" },
  { year: 2021, event: "Returns to Manchester United" },
  { year: 2023, event: "Joins Al Nassr in Saudi Arabia" }
];
const data = {
  "zidane": [zidaneCareerData,zidaneFace],
  'ronaldoN': [ronaldoNCareerData,ronaldoNFace],
  'ronaldo':[ronaldoCareerData,ronaldoFace],
  'beckham':[beckhamCareerData,beckhamFace],
  'figo':[figoCareerData,figoFace],
}


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



function createTimeline(container, {width, height}, player) {
  d3.select(container).selectAll("*").remove();

  const margin = {top: 50, right: 30, bottom: 30, left: 60};
  const rev_width = width - margin.left - margin.right;
  const rev_height = height - margin.top - margin.bottom;
  const careerData = data[player][0];

  d3.select(container)
    .append("div")
    .style("position", "absolute")
    .style("top", "-50px") 
    .style("left", "0")
    .style("width", "100%")
    .style("height", "200%") 
    .style("background-color", "rgba(255, 255, 255, 0.9)") 
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
  

  svg.append("line")
    .attr("x1", zx(1991))
    .attr("y1", rev_height / 2)
    .attr("x2", zx(2021))
    .attr("y2", rev_height / 2)
    .style("stroke", "#000000")
    .style("stroke-width", 3)
    .style("stroke-opacity", 1);
    
  
  careerData.forEach(d => {
    svg.append("line")
      .attr("x1", zx(d.year))
      .attr("y1", rev_height / 2 - 5)
      .attr("x2", zx(d.year))
      .attr("y2", rev_height / 2 + 5)
      .style("stroke", "#000000")
      .style("stroke-width", 2);
  });
    

  const imgSize = 50;
  

  const animatedElements = {
    zidaneImage: null,
    label: null,
    yearLabel: null
  };


  animatedElements.zidaneImage = svg.append("image")
    .attr("xlink:href", data[player][1])
    .attr("x", zx(careerData[0].year) - imgSize/2)
    .attr("y", rev_height / 2 - imgSize/2)
    .attr("width", imgSize)
    .attr("height", imgSize)
    .style("filter", "drop-shadow(2px 2px 3px rgba(0,0,0,0.5))");
  
  animatedElements.label = svg.append("text")
    .attr("x", zx(careerData[0].year))
    .attr("y", rev_height / 2 - imgSize - 15)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("fill", "#333333") 
    .text(careerData[0].event);

  animatedElements.yearLabel = svg.append("text")
    .attr("x", zx(careerData[0].year))
    .attr("y", rev_height / 2 - imgSize - 45)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .style("fill", "#990000") 
    .text(careerData[0].year);

  
  container.__animatedElements = animatedElements;


  startAnimation(animatedElements, zx,careerData);

  svg.append("g")
    .attr("transform", `translate(0, ${rev_height / 2 + 30})`)
    .call(d3.axisBottom(zx).tickFormat(d3.format("d")))
    .selectAll("text")
    .style("font-weight", "bold")
    .style("font-size", "16px")
    .style("fill", "#000000");
    
  svg.append("text")
    .attr("x", rev_width / 2)
    .attr("y", rev_height)
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .style("fill", "#000066")
    .text("Zinedine Zidane's Career Timeline");
}



function startAnimation(elements, zx,careerData) {
  if (elements.zidaneImage) elements.zidaneImage.interrupt();
  if (elements.label) elements.label.interrupt();
  if (elements.yearLabel) elements.yearLabel.interrupt();
  

  elements.zidaneImage
    .attr("x", zx(careerData[0].year) - 25);
  
  elements.label
    .attr("x", zx(careerData[0].year))
    .text(careerData[0].event);
    
  elements.yearLabel
    .attr("x", zx(careerData[0].year))
    .text(careerData[0].year);


  careerData.forEach((d, i) => {
    elements.zidaneImage.transition()
      .delay(i * 1000)
      .duration(1000)
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
  const ronaldoNTimeline = useRef(null);
  const ronaldoTimeline = useRef(null);
  const figoTimeline = useRef(null);
  const beckhHamTimeline = useRef(null);
  const isZidaneVisible = useRef(false);
  const isFigoVisible = useRef(false);
  const isBeckhamVisible = useRef(false);
  const isRonaldoNVisible = useRef(false);

  const setupZidaneScrollTrigger = () => {
    ScrollTrigger.create({
      trigger: bg2Ref.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        // Restart animation when entering view
        if (zidaneTimeline.current && zidaneTimeline.current.__animatedElements) {
          startAnimation( zidaneTimeline.current.__animatedElements, d3.scaleLinear()
          .domain([1991, 2021])
          .range([0, window.innerWidth - 90])
          .nice() , data["zidane"][0])
        }
        isZidaneVisible.current = true;
      },
      onLeave: () => {
        isZidaneVisible.current = false;
      },
      onEnterBack: () => {
        if (zidaneTimeline.current && zidaneTimeline.current.__animatedElements) {
          startAnimation( zidaneTimeline.current.__animatedElements,d3.scaleLinear()
          .domain([1991, 2021])
          .range([0, window.innerWidth - 90])
          .nice() , data["zidane"][0])
        }
        isZidaneVisible.current = true;
      },
      onLeaveBack: () => {
        isZidaneVisible.current = false;
      }
    });
  };

  const setupRonaldoNazScrollTrigger = () => {
    ScrollTrigger.create({
      trigger: bg3Ref.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        // Restart animation when entering view
        if (ronaldoNTimeline.current && ronaldoNTimeline.current.__animatedElements) {
          startAnimation( ronaldoNTimeline.current.__animatedElements, d3.scaleLinear()
          .domain([1991, 2021])
          .range([0, window.innerWidth - 90])
          .nice() , data["ronaldoN"][0])
        }
        isRonaldoNVisible.current = true;
      },
      onLeave: () => {
        isRonaldoNVisible.current = false;
      },
      onEnterBack: () => {
        if (ronaldoNTimeline.current && ronaldoNTimeline.current.__animatedElements) {
          startAnimation( ronaldoNTimeline.current.__animatedElements,d3.scaleLinear()
          .domain([1991, 2021])
          .range([0, window.innerWidth - 90])
          .nice() , data["ronaldoN"][0])
        }
        isRonaldoNVisible.current = true;
      },
      onLeaveBack: () => {
        isRonaldoNVisible.current = false;
      }
    });
  };


  function setupBeckhamScrollTrigger(){
    ScrollTrigger.create({
      trigger: bg4Ref.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        // Restart animation when entering view
        if (beckhHamTimeline.current && beckhHamTimeline.current.__animatedElements) {
          startAnimation( beckhHamTimeline.current.__animatedElements, d3.scaleLinear()
          .domain([1991, 2021])
          .range([0, window.innerWidth - 90])
          .nice() , data["beckham"][0])
        }
        isBeckhamVisible.current = true;
      },
      onLeave: () => {
        isBeckhamVisible.current = false;
      },
      onEnterBack: () => {
        if (beckhHamTimeline.current && beckhHamTimeline.current.__animatedElements) {
          startAnimation( beckhHamTimeline.current.__animatedElements,d3.scaleLinear()
          .domain([1991, 2021])
          .range([0, window.innerWidth - 90])
          .nice() , data["beckham"][0])
        }
        isBeckhamVisible.current = true;
      },
      onLeaveBack: () => {
        isBeckhamVisible.current = false;
      }
    });
  }
  useEffect(() => {
    const ctx = gsap.context(() => {
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

   
      gsap.set(bg1Ref.current, { opacity: 1 });
      gsap.set(bg2Ref.current, { opacity: 0 });
      gsap.set(bg3Ref.current, { opacity: 0 });
      gsap.set(bg4Ref.current, { opacity: 0 });
      gsap.set(bg5Ref.current, { opacity: 0 });
   
      tl.to(bg1Ref.current, { 
        opacity: 0, 
        duration: 2,
        onComplete: () => {
          console.log("bg1 fade out complete");
        }
      });
      

      tl.to(bg2Ref.current, { 
        opacity: 1, 
        duration: 2,
        onStart: () => {
          setupZidaneScrollTrigger();
        },
       
      }, "<");
      
      tl.to(bg2Ref.current, { 
        opacity: 0, 
        duration: 2,
        onComplete: () => {

        }
      });
      
      tl.to(bg3Ref.current, { 
        opacity: 1, 
        duration: 2,
        onStart: () => {
          console.log("bg3 fade in complete");
          setupRonaldoNazScrollTrigger();
        }
      }, "<");
      
      tl.to(bg3Ref.current, { 
        opacity: 0, 
        duration: 2,
      });
      
      tl.to(bg4Ref.current, { 
        opacity: 1, 
        duration: 2,
        onStart: () => {
          setupBeckhamScrollTrigger();
        }
      }, "<");
      
      tl.to(bg4Ref.current, { 
        opacity: 0, 
        duration: 2,
        onComplete: () => {
          console.log("bg4 fade out complete");

        }
      });
      
 
      ScrollTrigger.create({
        trigger: bg1Ref.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Restart animation when entering view
          if (figoTimeline.current && figoTimeline.current.__animatedElements) {
            startAnimation( figoTimeline.current.__animatedElements, d3.scaleLinear()
            .domain([1991, 2021])
            .range([0, window.innerWidth - 90])
            .nice() , data["figo"][0])
          }
          isFigoVisible.current = true;
        },
        onLeave: () => {
          isFigoVisible.current = false;
        },
        onEnterBack: () => {
          if (figoTimeline.current && figoTimeline.current.__animatedElements) {
            startAnimation( figoTimeline.current.__animatedElements,d3.scaleLinear()
            .domain([1991, 2021])
            .range([0, window.innerWidth - 90])
            .nice() , data["figo"][0])
          }
          isFigoVisible.current = true;
        },
        onLeaveBack: () => {
          isFigoVisible.current = false;
        }
      });

    
      

      /*
      ScrollTrigger.create({
        trigger: bg1Ref.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Restart animation when entering view
          if (figoTimeline.current && figoTimeline.current.__animatedElements) {
            startAnimation( figoTimeline.current.__animatedElements, d3.scaleLinear()
            .domain([1991, 2021])
            .range([0, window.innerWidth - 90])
            .nice() , data["figo"][0])
          }
          isFigoVisible.current = true;
        },
        onLeave: () => {
          isFigoVisible.current = false;
        },
        onEnterBack: () => {
          if (figoTimeline.current && figoTimeline.current.__animatedElements) {
            startAnimation( figoTimeline.current.__animatedElements,d3.scaleLinear()
            .domain([1991, 2021])
            .range([0, window.innerWidth - 90])
            .nice() , data["figo"][0])
          }
          isFigoVisible.current = true;
        },
        onLeaveBack: () => {
          isFigoVisible.current = false;
        }
      });

      ScrollTrigger.create({
        trigger: bg3Ref.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Restart animation when entering view
          if (ronaldoNTimeline.current && ronaldoNTimeline.current.__animatedElements) {
            startAnimation( ronaldoNTimeline.current.__animatedElements, d3.scaleLinear()
            .domain([1991, 2021])
            .range([0, window.innerWidth - 90])
            .nice() , data["ronaldoN"][0])
          }
          isRonaldoNVisible.current = true;
        },
        onLeave: () => {
          isRonaldoNVisible.current = false;
        },
        onEnterBack: () => {
          if (ronaldoNTimeline.current && ronaldoNTimeline.current.__animatedElements) {
            startAnimation( ronaldoNTimeline.current.__animatedElements,d3.scaleLinear()
            .domain([1991, 2021])
            .range([0, window.innerWidth - 90])
            .nice() , data["ronaldoN"][0])
          }
          isRonaldoNVisible.current = true;
        },
        onLeaveBack: () => {
          isRonaldoNVisible.current = false;
        }
      });
      */
     
     
      

    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    createModricScatterPlot(modricRef.current, {width:800, height:900});
    setmodricVis1(true);
    if (zidaneTimeline.current) {
      createTimeline(zidaneTimeline.current, { width: window.innerWidth, height: 300 },"zidane");
    }
    if (ronaldoNTimeline.current) {
      createTimeline(ronaldoNTimeline.current, { width: window.innerWidth, height: 300 },"ronaldoN");
    }
    if (figoTimeline.current) {
      createTimeline(figoTimeline.current, { width: window.innerWidth, height: 300 },"figo");
    }
    if (beckhHamTimeline.current) {
      createTimeline(beckhHamTimeline.current, { width: window.innerWidth, height: 300 },"beckham");
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
      }} >
        <div
              ref={figoTimeline}
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
            ></div>

      </div>

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

    <div div ref={bg3Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${ronaldoN})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 3,
      }} >

          <div
              ref={ronaldoNTimeline}
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
      }} >
         <div
              ref={beckhHamTimeline}
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
