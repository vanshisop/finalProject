// import { Parallax } from 'react-scroll-parallax';
import React, { useState,useEffect, useRef } from 'react';
import jersey from '../img/jersey.png';
import football_pitch from '../img/football_pitch.png';
// import tv_screen from '../img/tv_screen.png'; // Removed TV image import
import * as d3 from 'd3';
import jsonFile from '../mng/topPlayers_network.json';
import csvFile from '../mng/top50players.csv';
const form_positions = [
  { id: 27, position: "GK", x: 599 - 6, y: 495 },
  { id: 33, position: "LB", x: 290 - 110, y: 430 },
  { id: 38, position: "CB", x: 470 - 50, y: 430 },
  { id: 2,  position: "CB", x: 710 + 30, y: 430 },
  { id: 28, position: "RB", x: 890 + 90, y: 440 },
  { id: 39, position: "CM", x: 420 - 80, y: 300 },
  { id: 48, position: "CM", x: 594 - 6, y: 330 },
  { id: 11, position: "CM", x: 790 + 90, y: 300 },
  { id: 49, position: "LW", x: 390 - 10, y: 180 },
  { id: 50, position: "ST", x: 590 - 10, y: 160 },
  { id: 47, position: "RW", x: 790 - 10, y: 190 }
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

function defaultNetwork(container, options = {}, handlePlayerClick) {
  
  d3.select(container).selectAll('svg').remove();
  
  const width = options.width;
  const height = options.height + 600;
  
  const tooltip = d3.select(container).select('#tooltip');
  
 //remove ALL d3 elements

  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height/2)
    .style('z-index', 3) 
    .style('position', 'absolute')
    .style('left', '0')
    .style('top', '0')
    .style('transform', 'translate(0,0)')
    .style('pointer-events', 'all');

  const vizGroup = svg.append('g')
    .attr('class', 'viz-container');


  

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


  d3.forceSimulation(topXI_data.nodes)
    .force(
      'link',
      d3.forceLink(topXI_data.links)
        .id(d => d.id)
    )
    .force('center', d3.forceCenter(width / 2, height / 4))
    .on('tick', ticked);

    const link = vizGroup
      .selectAll('.link')
      .data(topXI_data.links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', 'white')
      .style('stroke-opacity', 0.8)
      .style('fill', 'none')
      .attr('stroke-width', d => d.value * 0.2)
      .on('click', (event, linkData) => {
        const sourceId = linkData.source.id;
        const targetId = linkData.target.id;

        const sourceName = topXI_data.nodes.find(n => n.id === sourceId).name;
        const targetName = topXI_data.nodes.find(n => n.id === targetId).name;

        // Highlight the node
        node.style('opacity', nodeData =>
          (nodeData.id === sourceId || nodeData.id === targetId) ? 1 : 0
        );
      
        // highlight the link
        link.style('opacity', l =>
          (l.source.id === sourceId && l.target.id === targetId) ? 1 : 0
        );
      
        const [mouseX, mouseY] = d3.pointer(event);

        tooltip
        .html(`<strong>Connection</strong><br>${sourceName} → ${targetName}<br> <strong>Years Played Together: </strong>${linkData.value}`)
        .style('left', `${mouseX}px`)
        .style('top', `${mouseY - 30}px`)
        .style('opacity', 1)
        .transition()
        .duration(50);      

        console.log(`Link clicked: Source ${sourceId}, Target ${targetId}`);
      
        // animate for 1 second
        setTimeout(() => {
          node.style('opacity', 1);
          link.style('opacity', 1);

        }, 1000);
      })
      .on('mouseover', (event, linkData) => {
        const sourceId = linkData.source.id;
        const targetId = linkData.target.id;

        const sourceName = topXI_data.nodes.find(n => n.id === linkData.source.id).name;
        const targetName = topXI_data.nodes.find(n => n.id === linkData.target.id).name;

        // Highlight the node
        node.style('opacity', nodeData =>
          (nodeData.id === sourceId || nodeData.id === targetId) ? 1 : 0
        );
      
        // highlight the link
        link.style('opacity', l =>
          (l.source.id === sourceId && l.target.id === targetId) ? 1 : 0
        );
      
        const [mouseX, mouseY] = d3.pointer(event);

        tooltip
        .html(`<strong>Connection</strong><br>${sourceName} → ${targetName}<br> <strong>Years Played Together: </strong>${linkData.value}`)
        .style('left', `${mouseX + 10}px`)
        .style('top', `${mouseY + 20}px`)
        .style('opacity', 1)
        .transition()
        .duration(50);      

        console.log(`Link clicked: Source ${sourceId}, Target ${targetId}`);
      
        // animate for 1 second
        setTimeout(() => {
          node.style('opacity', 1);
          link.style('opacity', 1);

        }, 1000);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
        node.style('opacity', 1);
        link.style('opacity', 1);
      })
      .attr('fill', 'none')
               
      link
        .attr('d', d3.linkHorizontal()
          .source(d => [d.source.x, d.source.y])
          .target(d => [d.target.x, d.target.y])
      );

  const node = vizGroup.selectAll('.node')
    .data(topXI_data.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .style('stroke', '#aaa')
    .on('click', (event, data) => {
      handlePlayerClick(data);  
    });
    
  node.append("image")
    .attr("xlink:href", jersey)
    .attr("width", 100)
    .attr("height", 100)
    .attr('x', -33.5)
    .attr('y', -41.5)
    .style("z-index", 3);

  node.append("text")
    .text(d => d.name)    
    .attr("text-anchor", "middle") 
    .attr("dy", 68)    
    .attr("dx", d => {
      if (d.id === "LB"){
        return 10;
      }
      return 18;
    })            
    .attr("font-size", "10px")   
    .attr("fill", "black")
    .style("z-index", 4);
    

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
  const [showSubstitutes, setShowSubstitutes] = useState(false);
  const [playersData, setPlayersData] = useState(null);
  const [swapPlayerID, setSwapPlayerID] = useState(0);
  const [checkXI, setCheckXI] = useState(false);
  
  useEffect(() => {
    console.log(topXI_data);
    
    if ((containerRef.current && !vizRef.current ) || checkXI) {
      vizRef.current = defaultNetwork(containerRef.current, { width: 2000, height: 550 }, handlePlayerClick);
    }

    const fetchPlayersData = async () => {
      try {
       
        const data =  jsonFile;
        setPlayersData(data);
        setCheckXI(false)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchPlayersData();
  }, [checkXI]);

  const handlePlayerClick = (playerData) => {
    setShowSubstitutes(true);
    setSwapPlayerID(playerData.id);
    console.log(`Player clicked: ${playerData.name}`);
  };
  function handleSwap(player) {
    console.log("hi");
    
    const playerID = player.id;
    const swapPlayer = playersData.nodes.find(p => p.id === swapPlayerID);
    topXI_data.nodes = topXI_data.nodes.filter(node => {
      return node.id !== swapPlayer.id;
    })
    topXI_data.links = topXI_data.links.filter(link => {
      return link.source.id !== swapPlayerID && link.target.id !== swapPlayerID;
    });
    d3.csv(csvFile).then(data => {
      const linksToPlayer = data.filter(link => {
        
        return link["Player_Name1"] === player.name || link["Player_Name2"] === player.name;
      });
      for (let i = 0; i < linksToPlayer.length; i++) {
        if(topXI_data.nodes.some(n => n.name === linksToPlayer[i]["Player_Name2"])){
          topXI_data.links.push({
            source: playerID,
            target: topXI_data.nodes.find(n => n.name === linksToPlayer[i]["Player_Name2"]).id,
            value: linksToPlayer[i]["Number_of_years_played_together"]
          });
        }
        if(topXI_data.nodes.some(n => n.name === linksToPlayer[i]["Player_Name1"])){
          topXI_data.links.push({
            source: playerID,
            target: topXI_data.nodes.find(n => n.name === linksToPlayer[i]["Player_Name1"]).id,
            value: linksToPlayer[i]["Number_of_years_played_together"]
          });
        }

       setCheckXI(true);



      }

      topXI_data.nodes.push(  {
        id: playerID,
        name: player.name,
        position: swapPlayer.position,
 
      })

      for (let i = 0; i < form_positions.length; i++) {
        if (form_positions[i].id === swapPlayer.id) {
          form_positions[i].id = playerID;
        }
      }
      console.log(form_positions);
      console.log(topXI_data.links);
      
      




    });
    
    
    // Perform the swap logic here
    // For example, you can update the state or make an API call to save the changes

    setShowSubstitutes(false);
  }
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
      <div
        className="tv-frame"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1050px',
          height: '620px',
          backgroundColor: 'rgba(34, 34, 34, 0.8)',
          borderRadius: '20px',
          boxShadow: '0 0 30px rgba(0,0,0,0.4)',
          padding: '20px',
          border: '15px solid #111',
          overflow: 'visible',
          zIndex: 1,
        }}
      >
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
            zIndex: 2,
            opacity: 0.9,
          }}
        />
        <div
          className={`substitutes-panel ${showSubstitutes ? 'show' : ''}`}
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0%',
            transform: 'translateX(-50%)',
            width: '97%',
            height: '200px',
            backgroundColor: 'rgba(34, 34, 34, 0.9)',
            zIndex: 700,
            padding: '20px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
            overflowY: 'auto',
            opacity: showSubstitutes ? 1 : 0,
            pointerEvents: showSubstitutes ? 'auto' : 'none',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            transform: showSubstitutes ? 'translateY(0)' : 'translateY(100%)',
          }}
        >
          <div className="substitutes" style={{}}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>Substitutes</h2>
            <div
              className="substitutes-list" style={{ display: 'flex',justifyContent: 'space-around',flexWrap: 'wrap',padding: '10px'}}>
              {playersData && playersData.nodes ? (
                  playersData.nodes
                    .filter(player => !topXI_data.nodes.some(p => p.id === player.id ))
                    .filter(player => player.id > 25)
                    .map(player => (
                      <div
                        key={player.id}
                        className="reserve"
                        onClick={() => handleSwap(player)}
                        style={{
                          backgroundColor: 'blue',
                          color: 'white',
                          padding: '10px',
                          borderRadius: '5px',
                          margin: '5px',
                          width: '150px',
                          textAlign: 'center',
                        }
                        
                      }
                      >
                        {player.name}
                      </div>
                    ))
                ) : (
                  <div>Loading reserves...</div>
                )}
            </div>
            <div className="reserves" style={{}}>
              <h2 style={{ color: 'white', textAlign: 'center' }}>Reserves</h2>
              <div
                className="reserves-list"
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  padding: '10px',
                }} >
                {playersData && playersData.nodes ? (
                  playersData.nodes
                    .filter(player => !topXI_data.nodes.some(p => p.id === player.id ))
                    .filter(player => player.id <= 25)
                    .map(player => (
                      <div
                        key={player.id}
                        className="reserve"
                        style={{
                          backgroundColor: 'red',
                          color: 'white',
                          padding: '10px',
                          borderRadius: '5px',
                          margin: '5px',
                          width: '150px',
                          textAlign: 'center',
                        }}
                      >
                        {player.name}
                      </div>
                    ))
                ) : (
                  <div>Loading reserves...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="tooltip"
        style={{
          position: 'absolute',
          opacity: 0,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
        }}
      />
    </div>
  );
};

export default TopPlayers;