// import { Parallax } from 'react-scroll-parallax';
import React, { useEffect, useRef } from 'react';
import jersey from '../img/jersey.png';
import football_pitch from '../img/football_pitch.png';
// import tv_screen from '../img/tv_screen.png'; // Removed TV image import
import * as d3 from 'd3';

const form_positions = [
  {id:27, position: "GK", x: 305 - 10, y: 555 - 90},
  {id:33, position: "LB", x: 100 - 90, y: 460 - 30},
  {id:38, position: "CB", x: 220 - 50, y: 460 - 30},
  {id:2, position: "CB", x: 380 + 30, y: 460 - 30},
  {id:28, position: "RB", x: 500 + 90, y: 460 - 20},
  {id:39, position: "CM", x: 200 - 20, y: 350 - 20},
  {id:48, position: "CM", x: 300 - 20, y: 350 - 20},
  {id:11, position: "CM", x: 400 - 20, y: 350 - 20},
  {id:49, position: "LW", x: 100 - 10, y: 200 - 10},
  {id:50, position: "ST", x: 300 - 10, y: 200 - 10},
  {id:47, position: "RW", x: 500 - 10, y: 200 - 10}
];   


const topXI_data = {
  "nodes": [
    {
      "id": 27,
      "name": "Iker Casillas",
      "position": "GK"
    },
    {
      "id": 38,
      "name": "Sergio Ramos",
      "position": "CB"
    },
    {
      "id": 2,
      "name": "Pepe",
      "position": "CB"
    },
    {
      "id": 33,
      "name": "Roberto Carlos",
      "position": "LB"
    },
    {
      "id": 28,
      "name": "Marcelo",
      "position": "RB"
    },
    {
      "id": 11,
      "name": "David Beckham",
      "position": "CM"
    },
    {
      "id": 39,
      "name": "Luka Modrić",
      "position": "CM"
    },
    {
      "id": 48,
      "name": "Zinédine Zidane",
      "position": "AM"
    },
    {
      "id": 49,
      "name": "Cristiano Ronaldo",
      "position": "LW"
    },
    {
      "id": 47,
      "name": "Raúl",
      "position": "RW"
    },
    {
      "id": 50,
      "name": "Alfredo Di Stéfano",
      "position": "ST"
    }
  ],
  "links": [
    {
      "source": 2,
      "target": 27,
      "value": 8
    },
    {
      "source": 2,
      "target": 28,
      "value": 10
    },
    {
      "source": 2,
      "target": 38,
      "value": 10
    },
    {
      "source": 2,
      "target": 39,
      "value": 5
    },
    {
      "source": 2,
      "target": 47,
      "value": 3
    },
    {
      "source": 11,
      "target": 27,
      "value": 4
    },
    {
      "source": 11,
      "target": 28,
      "value": 1
    },
    {
      "source": 11,
      "target": 33,
      "value": 4
    },
    {
      "source": 11,
      "target": 38,
      "value": 2
    },
    {
      "source": 11,
      "target": 47,
      "value": 4
    },
    {
      "source": 11,
      "target": 48,
      "value": 3
    },
    {
      "source": 27,
      "target": 28,
      "value": 9
    },
    {
      "source": 27,
      "target": 33,
      "value": 9
    },
    {
      "source": 27,
      "target": 38,
      "value": 10
    },
    {
      "source": 27,
      "target": 39,
      "value": 3
    },
    {
      "source": 27,
      "target": 47,
      "value": 12
    },
    {
      "source": 27,
      "target": 48,
      "value": 5
    },
    {
      "source": 27,
      "target": 49,
      "value": 6
    },
    {
      "source": 28,
      "target": 33,
      "value": 1
    },
    {
      "source": 28,
      "target": 38,
      "value": 15
    },
    {
      "source": 28,
      "target": 39,
      "value": 10
    },
    {
      "source": 28,
      "target": 47,
      "value": 4
    },
    {
      "source": 28,
      "target": 49,
      "value": 9
    },
    {
      "source": 33,
      "target": 38,
      "value": 2
    },
    {
      "source": 33,
      "target": 47,
      "value": 11
    },
    {
      "source": 33,
      "target": 48,
      "value": 5
    },
    {
      "source": 38,
      "target": 39,
      "value": 9
    },
    {
      "source": 38,
      "target": 47,
      "value": 5
    },
    {
      "source": 38,
      "target": 48,
      "value": 1
    },
    {
      "source": 38,
      "target": 49,
      "value": 9
    },
    {
      "source": 39,
      "target": 49,
      "value": 6
    },
    {
      "source": 47,
      "target": 48,
      "value": 5
    },
    {
      "source": 47,
      "target": 49,
      "value": 1
    },
  ]
}

function defaultNetwork(container, options = {}) {
  // Clear any existing SVG to prevent duplication
  d3.select(container).select('svg').remove();
  
  const width = options.width * 2;
  const height = options.height + 600;

  const tooltip = d3.select(container).select('#tooltip');
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .style('z-index', 50) // Increased z-index to be above all other elements
    .style('position', 'absolute')
    .style('left', '50%')
    .style('top', '30%')
    .style('transform', 'translate(-20%, -50%))')
    .style('pointer-events', 'all');

  // Create container for all visualization elements to better control positioning
  const vizGroup = svg.append('g')
    .attr('class', 'viz-container');

  const validLinks = topXI_data.links.filter(link => {
    return topXI_data.nodes.some(n => n.id === link.source) && 
           topXI_data.nodes.some(n => n.id === link.target);
  });

  const simulation = d3.forceSimulation(topXI_data.nodes)
    .force(
      'link',
      d3.forceLink(validLinks)
        .id(d => d.id)
    )
    .force('center', d3.forceCenter(width / 10, height / 10))
    .on('tick', ticked);

  const link = vizGroup
    .selectAll('.link')
    .data(validLinks)
    .enter()
    .append('line')
    .attr('class', 'link')
    .style('stroke', 'white') // Changed to white for better visibility
    .style('stroke-opacity', 0.8) // Increased opacity
    .attr('stroke-width', d => Math.max(2, d.value * 0.15)); // Increased minimum width and scaling

  const node = vizGroup.selectAll('.node')
    .data(topXI_data.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .style('stroke', '#aaa')
    .on('mouseover', (event, d) => {
      const connected = validLinks
        .filter(link => (link.source.id === d.id))
        .map(link => {
          const targetNode = topXI_data.nodes.find(n => (n.id === link.target.id));
          return targetNode ? targetNode.name : 'Unknown';
        });

      const targetsText = connected.length ? connected.join(', ') : 'None';
        
      tooltip
        .style('opacity', 1)
        .html(`<strong>${d.name}</strong><br/>Targets: ${targetsText}`);

      console.log(d.name + " " + "targetsText"); 
    })
    .on('mousemove', (event) => {
      tooltip
        .style('left', (event.pageX + 2) + 'px')
        .style('top', (event.pageY + 2) + 'px');
    })
    .on('mouseout', () => {
      tooltip.style('opacity', 0);
    });

  node.append("image")
    .attr("xlink:href", jersey)
    .attr("width", 140)
    .attr("height", 140)
    .attr('x', -33.5)
    .attr('y', -41.5)
    // .style("transform", "rotate(180deg)")
    .style("z-index", 8);

  node.append("text")
    .text(d => d.name)    
    .attr("text-anchor", "middle") 
    .attr("dy", 20)    
    .attr("dx", d => {
      if (d.id === "LB"){
        return 6;
      }
      return -10;
    })            
    .attr("font-size", "10px")   
    .attr("fill", "black");
    // .style("transform", "rotate(180deg)");
    

  topXI_data.nodes.forEach(node => {
    const pos = form_positions.find(p => p.id === node.id);
    if (pos) {
      node.fx = pos.x;
      node.fy = pos.y;
    }

    if (node.position === "GK") {
      node.fx = pos.x;
      node.fy = pos.y;
    }
  });

  function ticked() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  
    node
      .attr('transform', d => `translate(${d.x},${d.y})`);
  }
  
  return svg;
}

const TopPlayers = () => {
  const containerRef = useRef();
  const vizRef = useRef(null);

  useEffect(() => {
    // Prevent multiple initializations
    if (containerRef.current && !vizRef.current) {
      vizRef.current = defaultNetwork(containerRef.current, { width: 1200, height: 550 }); // Adjusted dimensions
      
      // Fine-tune the SVG position after it's created (only once)
      setTimeout(() => {
        const svg = d3.select(containerRef.current).select('svg');
        if (svg.node()) {
          // Adjusted transform to fix positioning issues - reduced rotation scaling
          // svg.style('transform', 'translate(-70%, -20%) rotate(180deg) scale(0.7)');
        }
      }, 100);
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (vizRef.current) {
        d3.select(containerRef.current).select('svg').remove();
        vizRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      className="tv-container"
      ref={containerRef} 
      style={{
        position: 'relative',
        width: '1200px',
        height: '800px',
        margin: '40px auto',
        overflow: 'visible',
      }}
    >
      {/* TV Frame */}
      <div 
        className="tv-frame"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1050px',
          height: '620px',
          backgroundColor: 'rgba(34, 34, 34, 0.8)', // Made slightly transparent
          borderRadius: '20px',
          boxShadow: '0 0 30px rgba(0,0,0,0.4)',
          padding: '20px',
          border: '15px solid #111',
          overflow: 'visible',
          zIndex: 1,
        }}
      >
        {/* Football Pitch inside TV frame */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundImage: `url(${football_pitch})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
            zIndex: 5,
            opacity: 0.9, // Reduced opacity to make links more visible
          }}
        />
      </div>
      <div id="tooltip" style={{ position: 'absolute', opacity: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', padding: '8px', borderRadius: '4px' }} />
    </div>
  );
};

export default TopPlayers;