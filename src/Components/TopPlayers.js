// import { Parallax } from 'react-scroll-parallax';
import React, { useEffect, useRef } from 'react';
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
  const width = options.width * 2;
  const height = options.height + 120;

  const tooltip = d3.select(container).select('#tooltip');

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .style('z-index', 10)
    .style('transform', 'translate(-540px,290px) rotate(180deg)');

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

  const link = svg
    .selectAll('line')
    .data(validLinks)
    .join('line')
    .style('stroke', 'black')
    .attr('stroke-width', d => d.value * 0.1);

    const node = svg.selectAll('.node')
      .data(topXI_data.nodes)
      .style('fill', 'steelblue')
      .enter().append("g")
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
      .attr("xlink:href", "white_jersey.png")
      .attr("width", 50)
      .attr("height", 50)
      .attr('x', -33.5)
      .attr('y', -41.5)
      .style("transform", "rotate(180deg)")
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
      .attr("fill", "black")
      .style("transform", "rotate(180deg)");
    

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

  useEffect(() => {
    if (containerRef.current) {
      defaultNetwork(containerRef.current, { width: 1400, height: 900 });
    }
  }, []);

  return (
    <div ref={containerRef} style={{
        position: 'relative',
        width: '1200px',
        height: '800px', 
        backgroundImage: "url('/tv_screen.png')",
        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: -5,
        overflow: 'hidden',
      }} >
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 75,
          width: '1000px',
          height: '500px',
          backgroundImage: "url('/football_pitch.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: -2,
        }}
      />
      <div style={{}}>

      </div>

      <div id="tooltip" style={{ position: 'absolute', opacity: 0 }} />
    </div>
  );
};


export default TopPlayers; 