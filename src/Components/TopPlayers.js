import React, { useState, useEffect, useRef } from 'react';
import jersey from '../img/jersey.png';
import football_pitch from '../img/football_pitch.png';
import commentatorsTable from '../img/ucl_table.png';
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
    }
  ]
};

function defaultNetwork(container, options = {}, handlePlayerClick) {
  
  d3.select(container).selectAll('svg').remove();
  
  const width = options.width;
  const height = options.height;
  const top = options.top;
  const left = options.left;
  
  const tooltip = d3.select(container).select('#tooltip');
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width/2)
    .attr('height', height/2)
    .style('z-index', 3) 
    .style('position', 'absolute')
    .style('left', '25px')
    .style('top', '25px')
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
    
    // Generate random jersey number between 1-20 if not present
    if (!node.shirt_number) {
      node.shirt_number = Math.floor(Math.random() * 20) + 1;
    }
  });

  const simulation = d3.forceSimulation(topXI_data.nodes)
    .force(
      'link',
      d3.forceLink(topXI_data.links)
        .id(d => d.id)
    )
    .force('center', d3.forceCenter(2000, height / 4))
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
    .attr('fill', 'none');
         
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
    
  // Add jersey number text on jersey
  node.append("text")
    .text(d => d.shirt_number || Math.floor(Math.random() * 20) + 1)
    .attr("text-anchor", "middle")
    .attr("dy", 10)
    .attr("dx", 18)
    .attr("font-size", "24px")
    .attr("font-weight", "bold")
    .attr("fill", "black")
    .style("z-index", 4);

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
      .attr('d', d => {
        return d3.linkHorizontal()
          .source(() => [d.source.x, d.source.y])
          .target(() => [d.target.x, d.target.y])();
      });
  
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
  const [commentaryText, setCommentaryText] = useState(
    "Welcome to our Real Madrid Legends analysis! On the right, you can see connections between players who've played together. The thicker the line, the more seasons they shared. Click on any player to substitute them."
  );
  
  const commentaryPhrases = [
    "Ah, what an interesting choice! This player brings a different dynamic to the team.",
    "Oh, I remember this squad from the glory days! What a fantastic selection.",
    "Quite a player you've chosen there! His connection with the midfield was legendary.",
    "This change will definitely strengthen the right flank. Great tactical substitution!",
    "That's a bold move! Let's see how this affects the team chemistry.",
    "Classic selection! I witnessed many of this player's greatest moments firsthand.",
    "This player was a true warrior on the pitch. Excellent choice!",
    "You can't go wrong with that substitution. Pure class!",
    "Look at the connections forming! That's the beauty of Real Madrid's tactical approach.",
    "That player had such vision on the ball. Changed many games single-handedly."
  ];
  
  const playerSpecificCommentary = {
    "Cristiano Ronaldo": "The great CR7! His goal-scoring record was simply phenomenal at Real Madrid.",
    "Zinédine Zidane": "Zizou! Both as a player and manager, his impact on Real Madrid can't be overstated.",
    "Sergio Ramos": "Ramos! The heart and soul of Real's defense for so many years. A true captain.",
    "Iker Casillas": "San Iker! One of the greatest goalkeepers to ever wear the white shirt."
  };

  useEffect(() => {
    console.log(topXI_data);
    
    if ((containerRef.current && !vizRef.current) || checkXI) {
      // Create tooltip if it doesn't exist
      if (!containerRef.current.querySelector('#tooltip')) {
        const tooltipDiv = document.createElement('div');
        tooltipDiv.id = 'tooltip';
        tooltipDiv.style.position = 'absolute';
        tooltipDiv.style.opacity = 0;
        tooltipDiv.style.zIndex = 100;
        tooltipDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
        tooltipDiv.style.color = 'white';
        tooltipDiv.style.padding = '8px';
        tooltipDiv.style.borderRadius = '4px';
        containerRef.current.appendChild(tooltipDiv);
      }
      
      // Get the actual dimensions of the TV container
      const tvContainer = containerRef.current;
      const tvFrame = tvContainer.querySelector('.tv-frame');
      
      if (tvFrame) {
        // Get the dimensions from the DOM element
        const containerWidth = tvFrame.clientWidth;
        const containerHeight = tvFrame.clientHeight;
        const containerTop = tvFrame.offsetTop;
        const containerLeft = tvFrame.offsetLeft;

        console.log("TV Frame dimensions:", { width: containerWidth, height: containerHeight, top: containerTop, left: containerLeft });

        vizRef.current = defaultNetwork(
          containerRef.current, 
          { width: containerWidth, height: containerHeight, top: containerTop, left: containerLeft }, 
          handlePlayerClick
        );
      }
    }

    const fetchPlayersData = async () => {
      try {
        setPlayersData(jsonFile);
        setCheckXI(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    
    fetchPlayersData();
  }, [checkXI]);

  const handlePlayerClick = (playerData) => {
    setShowSubstitutes(true);
    setSwapPlayerID(playerData.id);
    setCommentaryText(`You've selected ${playerData.name}! Who would you like to replace them with?`);
    console.log(`Player clicked: ${playerData.name}`);
  };
  
  function handleSwap(player) {
    const randomIndex = Math.floor(Math.random() * commentaryPhrases.length);
    const newCommentary = playerSpecificCommentary[player.name] || commentaryPhrases[randomIndex];
    setCommentaryText(newCommentary);
    
    console.log("Processing swap");
    
    const playerID = player.id;
    const swapPlayerID_current = swapPlayerID;
    
    // Remove the player to be swapped out
    topXI_data.nodes = topXI_data.nodes.filter(node => {
      return node.id !== swapPlayerID_current;
    });
    
    // Remove links related to that player
    topXI_data.links = topXI_data.links.filter(link => {
      return (link.source.id !== swapPlayerID_current && link.target.id !== swapPlayerID_current) &&
             (typeof link.source !== 'object' || link.source.id !== swapPlayerID_current) &&
             (typeof link.target !== 'object' || link.target.id !== swapPlayerID_current);
    });
    
    // Get the position of the swapped player
    const swapPlayerPosition = form_positions.find(pos => pos.id === swapPlayerID_current);
    
    // Find the player data
    const playerToAdd = playersData.nodes.find(p => p.id === playerID);
    
    if (playerToAdd && swapPlayerPosition) {
      // Add new player to nodes
      topXI_data.nodes.push({
        id: playerID,
        name: player.name,
        position: playerToAdd.position || "Unknown",
        shirt_number: Math.floor(Math.random() * 20) + 1
      });
      
      // Update position reference
      for (let i = 0; i < form_positions.length; i++) {
        if (form_positions[i].id === swapPlayerID_current) {
          form_positions[i].id = playerID;
          break;
        }
      }
      
      // For simplicity, we'll add a few links to other players
      const existingPlayerIds = topXI_data.nodes.map(n => n.id).filter(id => id !== playerID);
      
      // Add 2-3 random connections
      const numberOfConnections = Math.floor(Math.random() * 2) + 2;
      
      for (let i = 0; i < numberOfConnections && i < existingPlayerIds.length; i++) {
        const targetId = existingPlayerIds[i];
        
        // Add connection with random value between 1-10
        topXI_data.links.push({
          source: playerID,
          target: targetId,
          value: Math.floor(Math.random() * 10) + 1
        });
      }
    }
    
    setCheckXI(true);
    setShowSubstitutes(false);
  }
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="main-container"
        style={{
          display: 'flex',
          width: '1400px',
          height: '700px',
          position: 'relative',
        }}
      >
        <div 
          className="tv-container"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
          ref={containerRef}
        >
          <div
            className="tv-frame"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              height: '90%',
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
              <div className="substitutes">
                <h2 style={{ color: 'white', textAlign: 'center' }}>Substitutes</h2>
                <div
                  className="substitutes-list" 
                  style={{ 
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    padding: '10px'
                  }}
                >
                  {playersData && playersData.nodes ? (
                    playersData.nodes
                      .filter(player => !topXI_data.nodes.some(p => p.id === player.id))
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
                            cursor: 'pointer'
                          }}
                        >
                          {player.name}
                        </div>
                      ))
                  ) : (
                    <div>Loading substitutes...</div>
                  )}
                </div>
                <div className="reserves">
                  <h2 style={{ color: 'white', textAlign: 'center' }}>Reserves</h2>
                  <div
                    className="reserves-list"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexWrap: 'wrap',
                      padding: '10px',
                    }}
                  >
                    {playersData && playersData.nodes ? (
                      playersData.nodes
                        .filter(player => !topXI_data.nodes.some(p => p.id === player.id))
                        .filter(player => player.id <= 25)
                        .map(player => (
                          <div
                            key={player.id}
                            className="reserve"
                            onClick={() => handleSwap(player)}
                            style={{
                              backgroundColor: 'red',
                              color: 'white',
                              padding: '10px',
                              borderRadius: '5px',
                              margin: '5px',
                              width: '150px',
                              textAlign: 'center',
                              cursor: 'pointer'
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
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              zIndex: 900
            }}
          >
            {commentaryText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPlayers;