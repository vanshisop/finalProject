import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import elclasico from '../img/elclasico.jpg';
import text_ElClasico from '../img/transitions/topText_ELC.png';
import Papa from 'papaparse';
import bg from '../img/transitions/elclasicobg.jpg';
import madridlogo from '../img/real-madrid-logo.png';
import barcelonalogo from '../img/fc_barcelona.png';
import clasicodata from '../mng/el_clasico.csv';
gsap.registerPlugin(ScrollTrigger);

const ELClasicoVis = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const textRef = useRef(null); //
  const pitchref = useRef(null);
  const [data, setData] = useState([]);
  const statsRefLeft = useRef(null);
  const statsRefRight = useRef(null);
  const controlsRef = useRef(null);
  const [stats, setStats] = useState({ 
    realMadrid: { wins: 0, losses: 0, draws: 0 },
    barcelona: { wins: 0, losses: 0, draws: 0 }
  });
  const [displayCount, setDisplayCount] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1); // Animation speed multiplier
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);
  const calculateStats = (count) => {
    const visibleData = data.slice(0, count);
    const newStats = {
      realMadrid: { wins: 0, losses: 0, draws: 0 },
      barcelona: { wins: 0, losses: 0, draws: 0 }
    };
    
    visibleData.forEach(match => {
      if (match.Winner === 'Real Madrid') {
        newStats.realMadrid.wins++;
        newStats.barcelona.losses++;
      } else if (match.Winner === 'Barcelona') {
        newStats.barcelona.wins++;
        newStats.realMadrid.losses++;
      } else if (match.Winner === 'Draw') {
        newStats.realMadrid.draws++;
        newStats.barcelona.draws++;
      }
    });
    
    return newStats;
  };

  // Function to calculate win percentage
  const calculateWinPercentage = (team) => {
    const totalMatches = team.wins + team.losses + team.draws;
    return totalMatches > 0 ? ((team.wins / totalMatches) * 100).toFixed(1) : '0';
  };

  // Reset function for control bar
  const resetVisualization = () => {
    setDisplayCount(0);
    setStats({ 
      realMadrid: { wins: 0, losses: 0, draws: 0 },
      barcelona: { wins: 0, losses: 0, draws: 0 }
    });
    setIsPlaying(false);
    setAnimationSpeed(1);
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
  };

  // Start the animation with increasing speed
  const startAnimation = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    
    setIsPlaying(true);
    let currentSpeed = animationSpeed;
    
    const animate = () => {
      // Increase speed every 5 data points
      if (displayCount > 0 && displayCount % 5 === 0 && currentSpeed < 25) {
        currentSpeed = Math.min(currentSpeed + 2, 25); // Increase in steps of 2, max 25x
        setAnimationSpeed(currentSpeed);
      }
      
      setDisplayCount(prevCount => {
        if (prevCount < 217) {
          const newCount = prevCount + 1;
          setStats(calculateStats(newCount));
          return newCount;
        } else {
          setIsPlaying(false);
          clearInterval(animationRef.current);
          animationRef.current = null;
          return 217;
        }
      });
    };
    
    // Adjust interval based on speed (lower ms = faster)
    const baseInterval = 300; // Base speed in ms
    animationRef.current = setInterval(animate, baseInterval / currentSpeed);
  };

  // Stop the animation
  const stopAnimation = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
  
    const ctx = gsap.context(() => {
      Papa.parse(clasicodata, {
        download: true,
        header: true,
        complete: (result) => {
          setData(result.data); // Store the parsed data in state
          setTimeout(() => {
            startAnimation();
          }, 1000);
        },
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
      });

      gsap.fromTo(leftRef.current,
        { x: "-100%" },  
        {
          x: "0%",
          ease: "power1.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(rightRef.current,
        { x: "100%" },
        {
          x: "0%",
          ease: "power1.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: true,
          }
        }
      );

      // NEW: Move the text from above the screen to center
      gsap.fromTo(textRef.current,
        { y: "-100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(pitchref.current ,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: true,
          }
        }
      );
      gsap.fromTo(statsRefLeft.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%", 
            scrub: true,
          }
        }
      );

      gsap.fromTo(statsRefRight.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%", 
            scrub: true,
          }
        }
      );

      gsap.fromTo(controlsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%", 
            scrub: true,
          }
        }
      );
    }, sectionRef);
    return () => {
      ctx.revert();
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && animationRef.current) {
      clearInterval(animationRef.current);
      const baseInterval = 300;
      animationRef.current = setInterval(() => {
        setDisplayCount(prevCount => {
          if (prevCount < 217) {
            const newCount = prevCount + 1;
            setStats(calculateStats(newCount));
            
            // Increase speed every 5 data points
            if (newCount % 5 === 0 && animationSpeed < 25) {
              setAnimationSpeed(prev => Math.min(prev + 2, 25));
            }
            
            return newCount;
          } else {
            setIsPlaying(false);
            clearInterval(animationRef.current);
            animationRef.current = null;
            return 217;
          }
        });
      }, baseInterval / animationSpeed);
    }
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [animationSpeed, isPlaying]);

  return (
    <div ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' , backgroundImage: `url(${bg})`,}}>
      
      {/* Left Side */}
      <div ref={leftRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '50%',
        backgroundImage: `url(${elclasico})`,
        backgroundSize: '200% 100%',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
      }} />

      {/* Right Side */}
      <div ref={rightRef} style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '50%',
        backgroundImage: `url(${elclasico})`,
        backgroundSize: '200% 100%',
        backgroundPosition: 'right center',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
      }} />

      {/* Center Text Image */}
      <img
        ref={textRef}
        src={text_ElClasico}
        alt="El Clasico Text"
        style={{
          position: 'absolute',
          top: '5%', // You can adjust this to where you want it to land
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%', // Size of the text image
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div 
        ref={statsRefLeft}
        style={{
          position: 'absolute',
          top: '50%',
          left: '15%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '20%',
        }}
      >
        <img 
          src={madridlogo} 
          alt="Real Madrid Logo" 
          style={{ 
            width: '60px', 
            height: 'auto', 
            marginBottom: '10px' 
          }}
        />
        <h3 style={{ margin: '5px 0', color: '#0b1560' }}>Real Madrid</h3>
        <div style={{ 
          width: '100%', 
          textAlign: 'center',
          marginTop: '10px'
        }}>
          <div style={{ margin: '10px 0' }}>
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '22px', color: '#1a73e8' }}>{stats.realMadrid.wins}</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Wins</p>
          </div>
          <div style={{ margin: '10px 0' }}>
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '22px', color: '#ea4335' }}>{stats.realMadrid.losses}</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Losses</p>
          </div>
          <div style={{ margin: '10px 0' }}>
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '22px', color: '#fbbc05' }}>{stats.realMadrid.draws}</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Draws</p>
          </div>
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '18px' }}>
            {calculateWinPercentage(stats.realMadrid)}% Win Rate
          </p>
        </div>
      </div>

      <h2
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '5px 15px',
          borderRadius: '5px',
          textAlign: 'center',
        }}
      >
        Match History {displayCount > 0 ? `(${displayCount} of 217)` : ""}
        <div style={{ fontSize: '16px', marginTop: '5px', fontWeight: 'normal' }}>
          {isPlaying ? `Speed: ${animationSpeed}x` : ''}
        </div>
      </h2>

      {/* Barcelona Stats - Right Side */}
      <div 
        ref={statsRefRight}
        style={{
          position: 'absolute',
          top: '50%',
          right: '15%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '20%',
        }}
      >
        <img 
          src={barcelonalogo} 
          alt="Barcelona Logo" 
          style={{ 
            width: '60px', 
            height: 'auto', 
            marginBottom: '10px' 
          }}
        />
        <h3 style={{ margin: '5px 0', color: '#a50044' }}>Barcelona</h3>
        <div style={{ 
          width: '100%', 
          textAlign: 'center',
          marginTop: '10px'
        }}>
          <div style={{ margin: '10px 0' }}>
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '22px', color: '#1a73e8' }}>{stats.barcelona.wins}</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Wins</p>
          </div>
          <div style={{ margin: '10px 0' }}>
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '22px', color: '#ea4335' }}>{stats.barcelona.losses}</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Losses</p>
          </div>
          <div style={{ margin: '10px 0' }}>
            <p style={{ margin: '0', fontWeight: 'bold', fontSize: '22px', color: '#fbbc05' }}>{stats.barcelona.draws}</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Draws</p>
          </div>
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '18px' }}>
            {calculateWinPercentage(stats.barcelona)}% Win Rate
          </p>
        </div>
      </div>

      <div
        ref={pitchref}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'grid',
          gridTemplateColumns: 'repeat(15, 30px)',
          gridGap: '2.5px',
          zIndex: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        {data.slice(0, displayCount).map((item, index) => (
          item.Winner === 'Draw' || !item.Winner ? (
            <div
              key={index}
              style={{
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid gray',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              -
            </div>
          ) : (
            <img
              key={index}
              src={item.Winner === 'Real Madrid' ? madridlogo : barcelonalogo}
              alt={item.Winner}
              style={{
                width: '20px',
                height: '20px',
                objectFit: 'contain',
                border: '1px solid gray',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
              }}
            />
          )
        ))}
      </div>
      <div 
        ref={controlsRef}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px 15px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <button 
          onClick={resetVisualization}
          style={{
            padding: '8px 15px',
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Reset
        </button>
        
        <button 
          onClick={isPlaying ? stopAnimation : startAnimation}
          style={{
            padding: '8px 15px',
            backgroundColor: isPlaying ? '#ea4335' : '#34a853',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
          <span style={{ marginRight: '10px', fontSize: '14px' }}>Speed: {animationSpeed}x</span>
        </div>
      </div>
    </div>
  );
};

export default ELClasicoVis;