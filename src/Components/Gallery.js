import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import jersey from '../img/jersey.png';
import jersey_away from '../img/jersey_away.png';
import museum from '../img/museum.jpg';
import rma from '../img/real-madrid-logo.png';
import jersey_gk from '../img/jersey_gk.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import plData from '../mng/real_madrid_squad_history.csv';

const Gallery = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    country: 'All',
    position: 'All',
    searchTerm: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    countries: ['All'],
    positions: ['All']
  });
  const playersPerPage = 8;

  useEffect(() => {
    setLoading(true);

    d3.csv(plData)
      .then(data => {
        if (data && data.length > 0) {
          const uniquePlayers = {};
          
          data.forEach(player => {
            if (player.role === 'Player' && player.full_name) {
              const currentSeason = player.season || '';
              
              if (!uniquePlayers[player.full_name]) {
                uniquePlayers[player.full_name] = {
                  full_name: player.full_name,
                  position: player.position || 'Unknown',
                  shirt_number: player.shirt_number ? parseFloat(player.shirt_number) : Math.floor(Math.random() * 30) + 1,
                  country: player.country || 'Unknown',
                  birthdate: player.birthdate || 'Unknown',
                  jersey_type: Math.random() > 0.5 ? 'home' : 'away',
                  is_goalkeeper: player.position === 'Goalkeeper',
                  first_season: currentSeason,
                  last_season: currentSeason,
                  seasons: [currentSeason]
                };
              } else {
                if (!uniquePlayers[player.full_name].seasons.includes(currentSeason) && currentSeason) {
                  uniquePlayers[player.full_name].seasons.push(currentSeason);
                }
              }
            }
          });
          
          // Calculate first and last seasons for each player
          Object.values(uniquePlayers).forEach(player => {
            if (player.seasons.length > 0) {
              const sortedSeasons = [...player.seasons].sort((a, b) => {
                const yearA = parseInt(a.split('/')[0]);
                const yearB = parseInt(b.split('/')[0]);
                return yearA - yearB;
              });
              
              player.first_season = sortedSeasons[0];
              player.last_season = sortedSeasons[sortedSeasons.length - 1];
            }
          });
          
          const playersList = Object.values(uniquePlayers);
          
          setPlayers(playersList);
          setFilteredPlayers(playersList);
          
          const countries = ['All', ...new Set(playersList.map(player => player.country))];
          const positions = ['All', ...new Set(playersList.map(player => player.position))];
          
          setFilterOptions({
            countries: countries.filter(c => c && c !== 'Unknown').sort(),
            positions: positions.filter(p => p && p !== 'Unknown').sort()
          });
        } else {
          setError("No data found in CSV file");
        }
        
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load player data: " + err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...players];

    if (filters.country !== 'All') {
      result = result.filter(player => player.country === filters.country);
    }

    if (filters.position !== 'All') {
      result = result.filter(player => player.position === filters.position);
    }

    setFilteredPlayers(result);
    setCurrentPage(0);
  }, [filters, players]);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const resetFilters = () => {
    setFilters({
      country: 'All',
      position: 'All',
      searchTerm: ''
    });
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * playersPerPage < filteredPlayers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const renderPlayerJersey = (player, index) => {
    let jerseyImg = player.jersey_type === 'away' ? jersey_away : jersey;
    
    if (player.is_goalkeeper) {
      jerseyImg = jersey_gk;
    }

    return (
      <div
        key={`${player.full_name}-${index}`}
        className="player-item"
        onClick={() => handlePlayerClick(player)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: selectedPlayer?.full_name === player.full_name ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <div
          className="jersey-frame"
          style={{
            position: 'relative',
            padding: '12px',
            background: 'linear-gradient(to bottom, #d4af37, #f9e076, #d4af37)',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.4)',
            border: '2px solid #b8860b',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '160px',
            transition: 'all 0.3s ease',
            transform: selectedPlayer?.full_name === player.full_name ? 'translateY(-5px)' : 'translateY(0)',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #b8860b',
            boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
            zIndex: 2,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#111'
          }}>
            {player.position ? player.position.charAt(0) : '?'}
          </div>

          <div
            className="frame-inner"
            style={{
              backgroundColor: '#1e0c33',
              padding: '15px',
              borderRadius: '1px',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              minHeight: '150px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(30,12,51,0) 70%)',
              zIndex: 1
            }}></div>

            <div className="jersey-container" style={{ position: 'relative', zIndex: 2 }}>
              <img
                src={jerseyImg}
                alt={`${player.full_name} jersey`}
                style={{
                  width: '120px',
                  height: '120px',
                  filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.5))'
                }}
              />
              <div
                className="jersey-number"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '30px',
                  fontWeight: 'semibold',
                  fontFamily: '"Trajan Pro", serif',
                  color: '#d4af37',
                  textShadow: '0 0 5px rgba(0,0,0,0.5)'
                }}
              >
                {player.shirt_number ? Math.floor(player.shirt_number) : '?'}
              </div>
            </div>
          </div>

          <div
            className="nameplate"
            style={{
              width: 'calc(100% - 10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
              padding: '8px 5px',
              marginTop: '10px',
              borderRadius: '3px',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 3px 6px rgba(0,0,0,0.2), inset 0 0 5px rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.8)',
              backdropFilter: 'blur(5px)',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {player.full_name}
          </div>
        </div>
      </div>
    );
  };

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  const currentPlayers = filteredPlayers.length > 0 ?
    filteredPlayers.slice(
      currentPage * playersPerPage,
      Math.min((currentPage + 1) * playersPerPage, filteredPlayers.length)
    ) : [];

  const leftSidePlayers = currentPlayers.slice(0, Math.min(4, currentPlayers.length));
  const rightSidePlayers = currentPlayers.slice(Math.min(4, currentPlayers.length));

  if (error && players.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#050a30',
        color: 'white',
        padding: '20px'
      }}>
        <h2>Error loading player data</h2>
        <p>{error}</p>
        <p>Please check the CSV file path and format.</p>
      </div>
    );
  }

  return (
    <div
      className="gallery-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
        backgroundImage: `url(${museum})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        zIndex: 1
      }}></div>

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '0',
        right: '0',
        textAlign: 'center',
        color: '#d4af37',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        fontFamily: '"Trajan Pro", "Times New Roman", serif',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '38px',
          margin: '0',
          letterSpacing: '3px',
          fontWeight: 'bold'
        }}>REAL MADRID</h1>
        <h2 style={{
          fontSize: '24px',
          margin: '5px 0',
          letterSpacing: '5px',
          fontWeight: 'normal'
        }}>HALL OF LEGENDS</h2>
      </div>

      <div style={{ 
        marginTop: '100px', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        position: 'relative', 
        zIndex: 10 
      }}>
        {filteredPlayers.length === 0 ? (
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            color: 'white',
            maxWidth: '500px'
          }}>
            <h3>No players match your filter criteria</h3>
            <p>Try adjusting your filters or click the reset button to see all players.</p>
            <button
              onClick={resetFilters}
              style={{
                padding: '10px 20px',
                backgroundColor: '#d4af37',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '1400px', 
            height: '500px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '40px',
                color: currentPage === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
                cursor: currentPage === 0 ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                transform: currentPage === 0 ? 'scale(1)' : 'scale(1.1)',
                zIndex: 10,
                textShadow: currentPage === 0 ? 'none' : '0 0 10px rgba(255,255,255,0.5)',
                position: 'absolute',
                left: '-50px',
                top: '40%',
                transform: 'translateY(-50%)'
              }}
            >
              <FaChevronLeft />
            </button>

            <div
              className="player-tv-display"
              style={{
                width: '300px',
                height: '500px',
                background: 'linear-gradient(to bottom, #3a3a3a, #1a1a1a)',
                border: '20px solid #8b7d4a',
                borderRadius: '1px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(0, 0, 0, 0.8)',
                position: 'absolute',
                left: '50%',
                top: '35%', 
                transform: 'translate(-50%, -50%)',
                zIndex: 15,
                overflow: 'hidden'
              }}
            >
              {selectedPlayer ? (
                <div className="player-details" style={{ color: 'white', textAlign: 'center', zIndex: 2 }}>
                  <h2 style={{
                    borderBottom: '2px solid #d4af37',
                    paddingBottom: '10px',
                    marginBottom: '20px',
                    color: '#d4af37',
                    fontFamily: '"Trajan Pro", serif',
                    letterSpacing: '2px'
                  }}>
                    {selectedPlayer.full_name}
                  </h2>

                  <div style={{
                    fontSize: '100px',
                    marginBottom: '20px',
                    color: '#d4af37',
                    textShadow: '0 0 15px rgba(212,175,55,0.5)'
                  }}>
                    {selectedPlayer.shirt_number ? Math.floor(selectedPlayer.shirt_number) : '?'}
                  </div>

                  <div style={{ position: 'relative', marginBottom: '30px' }}>
                    <img
                      src={selectedPlayer.is_goalkeeper ? jersey_gk : (selectedPlayer.jersey_type === 'away' ? jersey_away : jersey)}
                      alt="Player jersey"
                      style={{
                        width: '80px',
                        height: '80px',
                        filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '15px',
                    borderRadius: '5px',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                  }}>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#d4af37' }}>Position:</strong> {selectedPlayer.position || 'Unknown'}</p>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#d4af37' }}>Country:</strong> {selectedPlayer.country || 'Unknown'}</p>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#d4af37' }}>Birthdate:</strong> {selectedPlayer.birthdate || 'Unknown'}</p>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#d4af37' }}>First Season:</strong> {selectedPlayer.first_season || 'Unknown'}</p>
                    <p style={{ margin: '5px 0' }}><strong style={{ color: '#d4af37' }}>Last Season:</strong> {selectedPlayer.last_season || 'Unknown'}</p>
                  </div>
                </div>
              ) : (
                <div style={{ color: '#d4af37', textAlign: 'center', zIndex: 2 }}>
                  <h3 style={{ fontFamily: '"Trajan Pro", serif', letterSpacing: '2px' }}>SELECT A LEGEND</h3>
                  <div style={{
                    marginTop: '20px',
                    width: '100px',
                    height: '100px',
                    margin: '30px auto',
                    backgroundImage: `url(${rma})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.7
                  }}></div>
                  <p style={{ color: '#aaa', marginTop: '20px' }}>Click on any jersey to see player details</p>
                </div>
              )}
            </div>

            <div
              className="gallery-layout"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '1400px',
                zIndex: 5,
                marginTop: '-120px' // Changed from -30px to -60px to move frames higher
              }}
            >
              <div
                className="left-side-players"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gap: '40px 20px',
                  padding: '20px',
                  width: '400px',
                  marginRight: '200px'
                }}
              >
                {leftSidePlayers.map((player, index) => renderPlayerJersey(player, index))}
              </div>

              <div style={{ width: '400px' }}></div>
              
              <div
                className="right-side-players"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  paddingLeft: '0px', // Changed to match left side's padding
                  gap: '40px 20px',
                  padding: '20px', // Changed to match left side's padding
                  width: '400px',
                  marginLeft: '200px'
                }}
              >
                {rightSidePlayers.map((player, index) => renderPlayerJersey(player, index + 4))}
              </div>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '40px',
                color: currentPage >= totalPages - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
                cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
                transition: 'all 0.3s ease',
                transform: currentPage >= totalPages - 1 ? 'scale(1)' : 'scale(1.1)',
                zIndex: 10,
                textShadow: currentPage >= totalPages - 1 ? 'none' : '0 0 10px rgba(255,255,255,0.5)',
                position: 'absolute',
                right: '-50px',
                top: '40%',
                transform: 'translateY(-50%)'
              }}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '115px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px 15px',
        borderRadius: '30px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        zIndex: 20,
        width: 'auto',
        maxWidth: '90%',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <select
          value={filters.country}
          onChange={(e) => handleFilterChange('country', e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '20px',
            background: 'rgba(20, 20, 40, 0.8)',
            color: '#d4af37',
            border: '1px solid #d4af37',
            fontSize: '14px',
            cursor: 'pointer',
            minWidth: '120px'
          }}
        >
          <option value="All">All Countries</option>
          {filterOptions.countries.filter(c => c !== 'All').map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          value={filters.position}
          onChange={(e) => handleFilterChange('position', e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '20px',
            background: 'rgba(20, 20, 40, 0.8)',
            color: '#d4af37',
            border: '1px solid #d4af37',
            fontSize: '14px',
            cursor: 'pointer',
            minWidth: '120px'
          }}
        >
          <option value="All">All Positions</option>
          {filterOptions.positions.filter(p => p !== 'All').map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          style={{
            padding: '8px 15px',
            borderRadius: '20px',
            background: '#d4af37',
            color: '#000',
            border: 'none',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      {filteredPlayers.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            color: 'white',
            fontSize: '14px',
            background: 'rgba(0,0,0,0.5)',
            padding: '5px 15px',
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            zIndex: 20
          }}
        >
          Page {currentPage + 1} of {Math.max(1, totalPages)} • Showing {filteredPlayers.length} players
        </div>
      )}
    </div>
  );
};

export default Gallery;
