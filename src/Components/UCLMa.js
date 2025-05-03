import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

//const baseImagePath = process.env.PUBLIC_URL + '/ucl_wins/';

const UCLMa = () => {
  const svgRef = useRef(null);
  const [selectedVictory, setSelectedVictory] = useState(null);
  const [hoveredVictory, setHoveredVictory] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);

  // Victory data array
  const victories = [
    {
        "Year": 1956,
        "City": "Paris",
        "Country": "France",
        "Stadium": "Parc des Princes",
        "Latitude": 48.8414,
        "Longitude": 2.2530,
        "Opponent": "Stade de Reims",
        "Real Madrid Goals": 4,
        "Opponent Goals": 3,
        "Stadium Image": "../ucl_wins/Parc_Des_Princes.jpeg",
        "Image": "../ucl_wins/1956.jpeg"
    },
    {
        "Year": 1957,
        "City": "Madrid",
        "Country": "Spain",
        "Stadium": "Santiago Bernabéu",
        "Latitude": 40.4531,
        "Longitude": -3.6883,
        "Opponent": "Fiorentina",
        "Real Madrid Goals": 2,
        "Opponent Goals": 0,
        "Stadium Image": "../ucl_wins/Santiago_Bernabéu.jpeg",
        "Image": "../ucl_wins/1957.jpeg"
    },
    {
        "Year": 1958,
        "City": "Brussels",
        "Country": "Belgium",
        "Stadium": "Heysel Stadium",
        "Latitude": 50.8950,
        "Longitude": 4.3347,
        "Opponent": "AC Milan",
        "Real Madrid Goals": 3,
        "Opponent Goals": 2,
        "Stadium Image": "../ucl_wins/Heysel_Stadium.jpeg",
        "Image": "../ucl_wins/1958.jpeg"
    },
    {
        "Year": 1959,
        "City": "Stuttgart",
        "Country": "Germany",
        "Stadium": "Neckarstadion",
        "Latitude": 48.7928,
        "Longitude": 9.2322,
        "Opponent": "Stade de Reims",
        "Real Madrid Goals": 2,
        "Opponent Goals": 0,
        "Stadium Image": "../ucl_wins/Neckarstadion.jpeg",
        "Image": "../ucl_wins/1959.jpeg"
    },
    {
        "Year": 1960,
        "City": "Glasgow",
        "Country": "Scotland",
        "Stadium": "Hampden Park",
        "Latitude": 55.8258,
        "Longitude": -4.2514,
        "Opponent": "Eintracht Frankfurt",
        "Real Madrid Goals": 7,
        "Opponent Goals": 3,
        "Stadium Image": "./ucl_wins/Hampden_Park.jpeg",
        "Image": "./ucl_wins/1960.jpeg"
    },
    {
        "Year": 1966,
        "City": "Brussels",
        "Country": "Belgium",
        "Stadium": "Heysel Stadium",
        "Latitude": 50.8950,
        "Longitude": 4.3347,
        "Opponent": "Partizan Belgrade",
        "Real Madrid Goals": 2,
        "Opponent Goals": 1,
        "Stadium Image": "./ucl_wins/Heysel_Stadium.jpeg",
        "Image": "./ucl_wins/1966.jpeg"
    },
    {
        "Year": 1998,
        "City": "Amsterdam",
        "Country": "Netherlands",
        "Stadium": "Amsterdam Arena",
        "Latitude": 52.3143,
        "Longitude": 4.9414,
        "Opponent": "Juventus",
        "Real Madrid Goals": 1,
        "Opponent Goals": 0,
        "Stadium Image": "./ucl_wins/Amsterdam_Arena.jpeg",
        "Image": "./ucl_wins/1998.jpeg"
    },
    {
        "Year": 2000,
        "City": "Paris",
        "Country": "France",
        "Stadium": "Stade de France",
        "Latitude": 48.9244,
        "Longitude": 2.3602,
        "Opponent": "Valencia",
        "Real Madrid Goals": 3,
        "Opponent Goals": 0,
        "Stadium Image": "./ucl_wins/Stade_De_France.jpeg",
        "Image": "./ucl_wins/2000.jpeg"
    },
    {
        "Year": 2002,
        "City": "Glasgow",
        "Country": "Scotland",
        "Stadium": "Hampden Park",
        "Latitude": 55.8258,
        "Longitude": -4.2514,
        "Opponent": "Bayer Leverkusen",
        "Real Madrid Goals": 2,
        "Opponent Goals": 1,
        "Stadium Image": "./ucl_wins/Hampden_Park.jpeg",
        "Image": "./ucl_wins/2002.jpeg"
    },
    {
        "Year": 2014,
        "City": "Lisbon",
        "Country": "Portugal",
        "Stadium": "Estádio da Luz",
        "Latitude": 38.7528,
        "Longitude": -9.1847,
        "Opponent": "Atlético Madrid",
        "Real Madrid Goals": 4,
        "Opponent Goals": 1,
        "Stadium Image": "./ucl_wins/Estádio_Da_Luz.jpeg",
        "Image": "./ucl_wins/2014.jpeg"
    },
    {
        "Year": 2016,
        "City": "Milan",
        "Country": "Italy",
        "Stadium": "San Siro",
        "Latitude": 45.4781,
        "Longitude": 9.1240,
        "Opponent": "Atlético Madrid",
        "Real Madrid Goals": "1 (5-3 pens)",
        "Opponent Goals": 1,
        "Stadium Image": "./ucl_wins/San_Siro.jpeg",
        "Image": "./ucl_wins/2016.jpeg"
    },
    {
        "Year": 2017,
        "City": "Cardiff",
        "Country": "Wales",
        "Stadium": "Principality Stadium",
        "Latitude": 51.4782,
        "Longitude": -3.1826,
        "Opponent": "Juventus",
        "Real Madrid Goals": 4,
        "Opponent Goals": 1,
        "Stadium Image": "./ucl_wins/Principality_Stadium.jpeg",
        "Image": "./ucl_wins/2017.jpeg"
    },
    {
        "Year": 2018,
        "City": "Kyiv",
        "Country": "Ukraine",
        "Stadium": "NSC Olimpiyskiy Stadium",
        "Latitude": 50.4333,
        "Longitude": 30.5211,
        "Opponent": "Liverpool",
        "Real Madrid Goals": 3,
        "Opponent Goals": 1,
        "Stadium Image": "./ucl_wins/NSC_Olimpiyskiy_Stadium.jpeg",
        "Image": "./ucl_wins/2018.jpeg"
    },
    {
        "Year": 2022,
        "City": "Paris",
        "Country": "France",
        "Stadium": "Stade de France",
        "Latitude": 48.9244,
        "Longitude": 2.3602,
        "Opponent": "Liverpool",
        "Real Madrid Goals": 1,
        "Opponent Goals": 0,
        "Stadium Image": "./ucl_wins/Stade_De_France.jpeg",
        "Image": "./ucl_wins/2022.jpeg"
    }];

  useEffect(() => {
    // Delay initialization slightly to ensure container is fully rendered
    const timer = setTimeout(() => {
      initializeMap();
    }, 100);
    
    const initializeMap = async () => {
      if (!svgRef.current || !svgRef.current.parentElement) {
        console.error("SVG reference or parent element not available");
        return;
      }
      
      const containerWidth = svgRef.current.parentElement.clientWidth;
      const containerHeight = svgRef.current.parentElement.clientHeight;
      
      console.log("Container dimensions:", containerWidth, containerHeight);
      
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      
      // Set explicit dimensions on the SVG
      svg.attr("width", containerWidth)
         .attr("height", containerHeight)
         .style("background-color", "#234B6E"); // Add background color for debugging
      
      const projection = d3.geoMercator()
        .center([8.2275, 46.8182])
        .scale(700)
        .translate([containerWidth / 2, containerHeight / 2]);

      const path = d3.geoPath().projection(projection);

      try {
        const europeData = await d3.json("https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson");
        
        if (!europeData || !europeData.features) {
          console.error("Invalid GeoJSON data:", europeData);
          // Display fallback text if map data doesn't load
          svg.append("text")
            .attr("x", containerWidth / 2)
            .attr("y", containerHeight / 2)
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .text("Map data could not be loaded. Please try again later.");
          return;
        }
        
        const customColors = d3.range(0, 1, 0.1).map(d3.interpolateGreens);
        const colorScale = d3.scaleOrdinal()
          .domain(europeData.features.map(d => d.properties.NAME))
          .range(customColors);

        const countriesWithVictories = new Set(victories.map(d => d.Country));

        const defs = svg.append("defs");
        const filter = defs.append("filter")
          .attr("id", "glow")
          .attr("height", "130%")
          .attr("width", "130%");
        
        filter.append("feGaussianBlur")
          .attr("stdDeviation", "3.5")
          .attr("result", "coloredBlur");
        
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Draw countries with error handling
        svg.selectAll(".country")
          .data(europeData.features)
          .enter().append("path")
          .attr("class", "country")
          .attr("d", path)
          .attr("fill", d => colorScale(d.properties.NAME))
          .attr("stroke", "#FFFFFF") // Make borders more visible
          .attr("stroke-width", d => countriesWithVictories.has(d.properties.NAME) ? 2 : 0.5)
          .attr("filter", d => countriesWithVictories.has(d.properties.NAME) ? "url(#glow)" : null);

        svg.selectAll("text")
          .data(europeData.features)
          .enter().append("text")
          .attr("transform", d => `translate(${projection(d3.geoCentroid(d))})`)
          .attr("dy", ".35em")
          .attr("font-size", d => countriesWithVictories.has(d.properties.NAME) ? "10px" : "8px")
          .attr("fill", "#333")
          .attr("text-anchor", "middle")
          .style("font-weight", d => countriesWithVictories.has(d.properties.NAME) ? "bold" : "normal")
          .text(d => d.properties.NAME);

        svg.selectAll(".victory")
          .data(victories)
          .enter().append("image")
          .attr("class", "victory-marker")
          .attr("xlink:href", "./ucl_wins//uefa.png")
          .attr("width", 40)
          .attr("height", 40)
          .attr("x", d => projection([d.Longitude, d.Latitude])[0] + (Math.random() - 0.5) * 20 - 20)
          .attr("y", d => projection([d.Longitude, d.Latitude])[1] + (Math.random() - 0.5) * 20 - 20)
          .style("filter", "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5))")
          .on("mouseover", (event, d) => {
            setHoveredVictory(d);
            setTooltipPosition({ x: event.pageX, y: event.pageY });
          })
          .on("mouseout", () => setHoveredVictory(null))
          .on("click", (event, d) => {
            setSelectedVictory(d);
            setShowModal(true);
          });

        // Add a background rect for debugging
        svg.insert("rect", ":first-child")
          .attr("width", containerWidth)
          .attr("height", containerHeight)
          .attr("fill", "#234B6E")
          .attr("opacity", 0.3);

        const zoom = d3.zoom()
          .scaleExtent([1, 8])
          .on("zoom", (event) => {
            svg.attr("transform", event.transform);
          });

        svg.call(zoom);
        
        console.log("Map initialization complete");

      } catch (error) {
        console.error("Error loading map data:", error);
        // Display error message in the SVG
        svg.append("text")
          .attr("x", containerWidth / 2)
          .attr("y", containerHeight / 2)
          .attr("text-anchor", "middle")
          .attr("fill", "white")
          .text("Error loading map. Please check console for details.");
      }
    };

    const handleResize = () => {
      clearTimeout(timer);
      initializeMap();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#4682B4',
      width: '100%',
      height: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
            <h1>Real Madrid's UCL Final Wins Across Europe</h1>
      <div style={{
        width: '80%',
        height: '80%',
        backgroundColor: '#000',
        borderRadius: '20px',
        border: '15px solid #333',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(0, 0, 0, 0.4)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* TV controls and decoration elements */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '20px',
          width: '40px',
          height: '20px',
          backgroundColor: '#444',
          borderRadius: '5px',
          zIndex: 2
        }}></div>
        
        {/* Map container - ensure it has proper dimensions */}
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a1a',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Use a key to force re-render when the component updates */}
          <svg 
            ref={svgRef} 
            style={{ width: '100%', height: '100%' }}
            key="map-svg"
          />
          
          {/* Fallback text if SVG is empty */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            display: 'none',
            zIndex: 1
          }} id="map-fallback">
            Loading map...
          </div>
        </div>
        
        {/* TV screen reflection */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)',
          pointerEvents: 'none',
          zIndex: 2
        }}></div>
      </div>

      {hoveredVictory && (
        <div style={{
          position: 'absolute',
          left: tooltipPosition.x + 10,
          top: tooltipPosition.y - 28,
          backgroundColor: 'black',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          pointerEvents: 'none',
          fontFamily: "'Oswald', sans-serif",
          zIndex: 10
        }}>
          <div style={{ textAlign: 'left' }}>
            <strong>Year:</strong> {hoveredVictory.Year}<br/>
            <strong>City:</strong> {hoveredVictory.City}<br/>
            <strong>Stadium:</strong> {hoveredVictory.Stadium}<br/>
            <strong>Opponent:</strong> {hoveredVictory.Opponent}<br/>
            <strong>Score:</strong> {hoveredVictory["Real Madrid Goals"]} - {hoveredVictory["Opponent Goals"]}<br/>
            <img 
              src={hoveredVictory["Stadium Image"]} 
              alt={hoveredVictory.Stadium}
              style={{ width: '200px', height: 'auto', marginTop: '10px', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}

      {showModal && selectedVictory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '30px',
            borderRadius: '12px',
            width: '600px',
            maxHeight: '80%',
            overflowY: 'auto',
            position: 'relative',
            fontFamily: "'Oswald', sans-serif"
          }}>
            <span 
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <img
              src={selectedVictory.Image}
              alt={selectedVictory.Year}
              style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '10px' }}
            />
            <h3>{selectedVictory.Year} - {selectedVictory.City}</h3>
            <p><strong>Stadium:</strong> {selectedVictory.Stadium}</p>
            <p><strong>Opponent:</strong> {selectedVictory.Opponent}</p>
            <p><strong>Score:</strong> {selectedVictory["Real Madrid Goals"]} - {selectedVictory["Opponent Goals"]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UCLMa;