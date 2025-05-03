import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import santiago from '../img/santiago.png';
import * as d3 from 'd3';

gsap.registerPlugin(ScrollTrigger);

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

const Santiago = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayRef2 = useRef(null);
  const overlayRef3 = useRef(null);
  const overlayRef4 = useRef(null);
  const chartRef = useRef(null);
  const [selectedTeam, setSelectedTeam] = useState('Barcelona');

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    padding: '2rem',
    textAlign: 'center',
  };

  const createChart = (chartElement, team) => {
    d3.select(chartElement).selectAll("*").remove();

    const margin = { top: 10, right: 10, bottom: 80, left: 60 };
    const width = chartElement.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartElement)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([1943, 1978])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(teamsData['Real Madrid'], d => d.trophies) + 5])
      .range([height, 0]);

    svg.append("g").attr("class", "grid").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(7).tickSize(-height).tickFormat(""))
      .attr("color", "#78716c").attr("opacity", 0.2);

    svg.append("g").attr("class", "grid")
      .call(d3.axisLeft(yScale).ticks(10).tickSize(-width).tickFormat(""))
      .attr("color", "#78716c").attr("opacity", 0.2);

    svg.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(7).tickFormat(d => d))
      .attr("color", "#44403c").attr("font-family", "serif")
      .select(".domain").attr("stroke", "#44403c");

    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(10))
      .attr("color", "#44403c").attr("font-family", "serif")
      .select(".domain").attr("stroke", "#44403c");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0 - height / 2)
      .attr("y", -margin.left + 15)
      .style("text-anchor", "middle")
      .attr("fill", "#44403c")
      .attr("font-size", "16px")
      .attr("font-family", "serif")
      .attr("font-weight", "bold")
      .text("Trophies");

    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.trophies))
      .curve(d3.curveMonotoneX);

    const madridLine = svg.append("path")
      .datum(teamsData['Real Madrid'])
      .attr("fill", "none")
      .attr("stroke", "#000000")
      .attr("stroke-width", 3)
      .attr("d", line);

    const madridLength = madridLine.node().getTotalLength();
    madridLine
      .attr("stroke-dasharray", madridLength)
      .attr("stroke-dashoffset", madridLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    const teamLine = svg.append("path")
      .datum(teamsData[team])
      .attr("fill", "none")
      .attr("stroke", "#8b0000")
      .attr("stroke-width", 2)
      .attr("d", line);

    const teamLength = teamLine.node().getTotalLength();
    teamLine
      .attr("stroke-dasharray", teamLength)
      .attr("stroke-dashoffset", teamLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    svg.selectAll(".madrid-dot")
      .data(teamsData['Real Madrid'])
      .enter()
      .append("circle")
      .attr("class", "madrid-dot")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.trophies))
      .attr("r", 0)
      .attr("fill", "#000000")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", 5)
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    svg.selectAll(".team-dot")
      .data(teamsData[team])
      .enter()
      .append("circle")
      .attr("class", "team-dot")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.trophies))
      .attr("r", 0)
      .attr("fill", "#8b0000")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", 4)
      .attr("stroke", "white")
      .attr("stroke-width", 1);

    const annotations = [
      { year: 1956, text: "First European Cup", team: "Real Madrid" },
      { year: 1960, text: "5th European Cup", team: "Real Madrid" }
    ];

    const annotationGroup = svg.append("g").attr("class", "annotations");

    annotations.forEach(anno => {
      const dataPoint = teamsData[anno.team].find(d => d.year === anno.year);
      if (!dataPoint) return;

      const x = xScale(dataPoint.year);
      const y = yScale(dataPoint.trophies);

      annotationGroup.append("line")
        .attr("x1", x).attr("y1", y - 10)
        .attr("x2", x).attr("y2", y - 40)
        .attr("stroke", "#44403c")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3")
        .style("opacity", 0)
        .transition().delay(2000).duration(500).style("opacity", 1);

      annotationGroup.append("text")
        .attr("x", x).attr("y", y - 45)
        .attr("text-anchor", "middle")
        .attr("fill", "#44403c")
        .attr("font-family", "serif")
        .attr("font-size", "12px")
        .attr("font-style", "italic")
        .text(anno.text)
        .style("opacity", 0)
        .transition().delay(2000).duration(500).style("opacity", 1);
    });
  };

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

      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 });
      tl.to(overlayRef.current, { opacity: 0, duration: 1 });
      tl.fromTo(overlayRef2.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      tl.to(overlayRef2.current, { opacity: 0, duration: 1 });
      tl.fromTo(overlayRef3.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      tl.to(overlayRef3.current, { opacity: 0, duration: 1 });
      tl.fromTo(overlayRef4.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (chartRef.current && overlayRef4.current.style.opacity > 0) {
      createChart(chartRef.current, selectedTeam);
    }
  }, [selectedTeam, overlayRef4.current?.style.opacity]);

  return (
    <div ref={sectionRef} style={{ height: '100vh', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, height: '100%', width: '100%',
        backgroundImage: `url(${santiago})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 1,
      }} />

      <div ref={overlayRef} style={overlayStyle}>
        <div style={{ maxWidth: '1300px', padding: '2rem', marginTop: '30px' }}>
          <p style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '20px', color: '#3a3226', fontWeight: 'normal',
            lineHeight: '1.6', textAlign: 'justify', letterSpacing: '0.03em',
            textShadow: '0.5px 0.5px 1px rgba(155, 125, 85, 0.2)',
            padding: '1.5rem', borderLeft: '3px solid #8b6f47'
          }}>
            <span style={{
              fontSize: '34px', color: '#5c4d3c',
              fontFamily: '"IM Fell DW Pica SC", serif',
              fontWeight: 'bold', letterSpacing: '1px'
            }}>T</span>he reign of Santiago Bernabéu begins. With a vision to transform the world of football, Bernabéu took charge of the club, guiding it through new heights of success and cementing its place in history as one of the most iconic figures in football. His leadership changed not just the trajectory of the club, but also the sport itself, setting standards that would influence generations.
          </p>
        </div>
      </div>

      <div ref={overlayRef2} style={overlayStyle}>
        <div style={{ maxWidth: '1300px', padding: '1rem', marginTop: '30px' }}>
          <h2 style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '36px', color: '#3a3226', fontWeight: 'bold',
            lineHeight: '1.6', textAlign: 'center', letterSpacing: '0.03em',
            paddingBottom: '1rem', borderBottom: '2px solid #8b6f47',
          }}>
            The Birth of the European Championships
          </h2>
          <p style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '20px', color: '#3a3226', fontWeight: 'normal',
            lineHeight: '1.6', textAlign: 'justify', letterSpacing: '0.03em',
            textShadow: '0.5px 0.5px 1px rgba(155, 125, 85, 0.2)',
            padding: '1.5rem', borderLeft: '3px solid #8b6f47'
          }}>
            <span style={{
              fontSize: '34px', color: '#5c4d3c',
              fontFamily: '"IM Fell DW Pica SC", serif',
              fontWeight: 'bold', letterSpacing: '1px'
            }}>T</span>he inception of the European Championships marks a pivotal moment in the history of football. The first tournament, held in 1960, brought together the best teams from across Europe to compete for the prestigious title. This tournament, created to unify the continent through the love of the sport, paved the way for the future of international football. It has since evolved into one of the most-watched and celebrated sporting events, capturing the imagination of millions every four years.
          </p>
        </div>
      </div>

      <div ref={overlayRef3} style={overlayStyle}>
        <div style={{ maxWidth: '1300px', padding: '2rem', marginTop: '30px' }}>
          <h2 style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '36px', color: '#3a3226', fontWeight: 'bold',
            lineHeight: '1.6', textAlign: 'center', letterSpacing: '0.03em',
            paddingBottom: '1rem', borderBottom: '2px solid #8b6f47',
          }}>
            Utter Ridiculous!!
          </h2>
          <p style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '20px', color: '#3a3226', fontWeight: 'normal',
            lineHeight: '1.6', textAlign: 'justify', letterSpacing: '0.03em',
            textShadow: '0.5px 0.5px 1px rgba(155, 125, 85, 0.2)',
            padding: '1.5rem', borderLeft: '3px solid #8b6f47'
          }}>
            <span style={{
              fontSize: '34px', color: '#5c4d3c',
              fontFamily: '"IM Fell DW Pica SC", serif',
              fontWeight: 'bold', letterSpacing: '1px'
            }}>R</span>eal Madrid wins first 5 European Championships in a row.
          </p>
        </div>
      </div>

      <div ref={overlayRef4} style={{
        position: 'absolute', top: '36vh', left: 0, height: '100%', width: '100%',
        zIndex: 2, display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center', overflowY: 'auto', paddingTop: '0px',
      }}>
        <div style={{
          width: '100%', display: 'flex', backgroundColor: 'rgba(240, 237, 230, 0)',
          boxShadow: 'none', marginLeft: '2rem', marginRight: '2rem',
        }}>
          <div style={{
            width: '30%', paddingLeft: '10px', paddingTop: '0px',
            paddingRight: '10px', borderRight: '1px solid #8b6f47',
          }}>
            <div style={{ marginBottom: '15px' }}>
              <h2 style={{
                fontFamily: '"IM Fell English", "Times New Roman", serif',
                fontSize: '24px', color: '#000000', fontWeight: 'bold', marginBottom: '5px',
              }}>
                No Team Is Safe
              </h2>
              <p style={{
                fontFamily: '"IM Fell English", serif',
                fontSize: '14px', fontStyle: 'italic', color: '#444',
              }}>By ENRIQUE DE GOLAZO</p>
            </div>

            <div style={{ borderBottom: '1px solid #8b6f47', marginBottom: '15px' }}></div>

            <p style={{
              fontFamily: '"IM Fell English", serif', fontSize: '20px',
              textAlign: 'justify', color: '#000000', lineHeight: '1.5', marginBottom: '15px',
            }}>
              Madridistas woke up this morning to the same shocking truth as the last five years: Real Madrid have done it again.
            </p>

            <p style={{
              fontFamily: '"IM Fell English", serif', fontSize: '20px',
              textAlign: 'justify', color: '#000000', lineHeight: '1.5', marginBottom: '15px',
            }}>
              "We tried everything," said a frustrated Barcelona coach. "Man-marking, zone defense, even bribing the weather gods. But the storm in white never stops."
            </p>
          </div>

          <div style={{
            width: '40%', padding: '25px', paddingTop: '0px',
            borderRight: '1px solid #8b6f47', borderLeft: '1px solid #8b6f47',
          }}>
            <div style={{ marginBottom: '0px' }}>
              <h2 style={{
                fontFamily: '"IM Fell English", "Times New Roman", serif',
                fontSize: '20px', color: '#000000', fontWeight: 'bold',
                marginBottom: '5px', textAlign: 'center',
              }}>
                Graphical Evidence of Terror
              </h2>
              <p style={{
                fontFamily: '"IM Fell English", serif', fontSize: '16px',
                fontWeight: 'bold', textAlign: 'center', color: '#000000', marginBottom: '10px',
              }}>Madrid's Trophies vs. Local Teams (1943–1978)</p>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '15px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#000000', marginRight: '5px' }}></div>
                  <span style={{ fontSize: '12px', fontFamily: '"IM Fell English", serif', color: '#000000' }}>Real Madrid</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#8b0000', marginRight: '5px' }}></div>
                  <span style={{ fontSize: '12px', fontFamily: '"IM Fell English", serif', color: '#000000' }}>{selectedTeam}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', zIndex: 100 }}>
                <label style={{
                  fontSize: '14px', fontFamily: '"IM Fell English", serif', color: '#000000',
                  marginRight: '8px', marginBottom: '10px'
                }}>Compare with:</label>
                <select
                  id="teamSelector"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  style={{
                    padding: '6px 6px', paddingBottom: '0px', paddingTop: '2px',
                    borderColor: '#8b6f47', backgroundColor: '#f5f3ee', color: '#000000',
                    fontSize: '13px', fontFamily: '"IM Fell English", serif',
                    cursor: 'pointer', position: 'relative', zIndex: 1000
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {Object.keys(teamsData).filter(team => team !== 'Real Madrid').map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{
              height: '350px', marginBottom: '10px',
              border: '9px solidrgba(211, 211, 211, 0.5)',
              backgroundColor: '#fafafa', borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }} ref={chartRef} />
          </div>

          <div style={{
            width: '30%', padding: '25px', paddingTop: '0px', borderLeft: '1px solid #8b6f47',
          }}>
            <div style={{ marginBottom: '15px' }}>
              <h2 style={{
                fontFamily: '"IM Fell English", "Times New Roman", serif',
                fontSize: '24px', color: '#000000', fontWeight: 'bold', marginBottom: '5px',
              }}>
                Quote of the Decade
              </h2>
              <p style={{
                fontFamily: '"IM Fell English", serif',
                fontSize: '14px', fontStyle: 'italic', color: '#444',
              }}>by ALFREDO DI STÉFANO (Allegedly)</p>
            </div>

            <div style={{ borderBottom: '1px solid #8b6f47', marginBottom: '25px' }}></div>

            <p style={{
              fontFamily: '"IM Fell English", serif', fontSize: '20px',
              textAlign: 'center', color: '#000000', lineHeight: '1.5',
              fontStyle: 'italic', margin: '25px 0',
            }}>
              "I don't chase records. Records chase me."
            </p>

            <p style={{
              fontFamily: '"IM Fell English", serif', fontSize: '20px',
              textAlign: 'right', color: '#000000', lineHeight: '1.5', marginBottom: '20px',
            }}>
              – Di Stéfano, possibly while polishing yet another winner's medal.
            </p>

            <p style={{
              fontFamily: '"IM Fell English", serif', fontSize: '20px',
              textAlign: 'justify', color: '#000000', lineHeight: '1.5', marginTop: '20px',
            }}>
              Experts believe the Santiago Bernabéu pitch may need reinforcement—not due to wear and tear, but to support the gravitational pull of all the silverware concentrated in one location. The Royal Palace is reportedly jealous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Santiago;