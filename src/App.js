import React, { useState, useEffect } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Timeline from './Components/Timeline';
import Trophies from './Components/Trophies';
import RealMadridOrigins from './Components/RealMadridOrigins';
import real_madrid_1trophy from './img/real_madrid_1trophy.jpg';

export default function App() {
  const [currentYear, setCurrentYear] = useState(1902);
  const [showTimeLine, setShowTimeLine] = useState(true);
  const [st1, setst1] = useState(false);
  const [st2, setst2] = useState(false);
  const [st3, setst3] = useState(false);
  const [ct1, setct1] = useState(false);
  const [ct2, setct2] = useState(false);
  const [ct3, setct3] = useState(false);
  const [tp1, settp1] = useState(0);
  const [tp2, settp2] = useState(0);
  const [tp3, settp3] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate scroll percentage (0 to 1)
    const scrollPercent = scrollPosition / (documentHeight - windowHeight);

    let newYear;

    // Define the thresholds and corresponding years
    if (scrollPercent <= 0.20) {
      setShowTimeLine(true);
      newYear = 1902;
    } else if (scrollPercent > 0.20 && scrollPercent <= 0.35) {
      setShowTimeLine(true);
      setst1(true);
      setct1(true);
      newYear = 1903;
    } else if (scrollPercent > 0.35 && scrollPercent <= 0.6) {
      setShowTimeLine(true);
      setct1(false);
      settp1(1);
      newYear = 1905;
    } else {
      setShowTimeLine(false);
      newYear = 1954;
      // Calculate opacity for the overlay (0 to 1) as we scroll through the last section
      const overlayScrollPercent = (scrollPercent - 0.75) / 0.25;
      setOverlayOpacity(Math.min(1, Math.max(0, overlayScrollPercent)));
    }

    // Clamp the year between 1900 and 1965
    newYear = Math.max(1900, Math.min(1965, newYear));
    
    setCurrentYear(newYear);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ParallaxProvider>
      <div className="first-steps" style={{ position: 'relative' }}>
        {/* Fixed top section */}
        {showTimeLine && (
          <div style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(8px)',
            padding: '10px 20px',
          }}>
            <Timeline currentYear={currentYear} />
            <Trophies currentYear={currentYear} showTrophy1={st1} showTrophy2={st2} showTrophy3={st3} 
              circletrophy1={ct1} circletrophy2={ct2} circletrophy3={ct3} 
              trophy1Count={tp1} trophy2Count={tp2} trophy3Count={tp3}/>
          </div>
        )}
        
        {/* Content area */}
        <div style={{ paddingTop: '80px' }}>
          {/* Section 1 */}
          <RealMadridOrigins/>
        
          {/* Section 2 */}
          <Parallax translateY={[-20, 20]} style={{
            height: '140vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <h2>Copa Del Rey was established</h2>
            </div>
          </Parallax>

          {/* Section 3 */}
          <Parallax translateY={[-20, 20]} style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              height: '100%',
              width: '60%'
            }}>
              <h1>First Taste of Victory</h1>
              <h4>Real Madrid won their first Copa del Rey title in 1905, just three years after the club was founded...</h4>
            </div>
          </Parallax>
          
          {/* Section 4 - Just the background image */}
          <div style={{
            height: '100vh',
            width: '100%',
            backgroundImage: `url(${real_madrid_1trophy})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }} />
          
          {/* Section 5 - Fixed background with fading overlay */}
          <div style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
          }}>
            {/* Fixed Background */}
            <div style={{
              backgroundImage: `url(${real_madrid_1trophy})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1
            }} />
            
            {/* Content Overlay that fades in on scroll */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity * 0.7})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transition: 'background-color 0.3s ease',
            }}>
              <div style={{
                maxWidth: '800px',
                padding: '2rem',
                background: `rgba(0, 0, 0, ${overlayOpacity * 0.8})`,
                borderRadius: '10px',
                transform: `translateY(${(1 - overlayOpacity) * 50}px)`,
                opacity: overlayOpacity,
                transition: 'all 0.5s ease',
              }}>
                <h2>1905 Copa del Rey Winning Team</h2>
                <p>The historic team that brought Real Madrid its first major trophy:</p>
                <ul style={{ columns: 2 }}>
                  <li>Manuel Yarza (Captain)</li>
                  <li>José Berraondo</li>
                  <li>José Ángel Berraondo</li>
                  <li>Federico Revuelto</li>
                  <li>Antonio Alonso</li>
                  <li>Manuel Prast</li>
                  <li>Eduardo Arózamena</li>
                  <li>José Quirante</li>
                  <li>Francisco Palacios</li>
                  <li>Enrique Normand</li>
                  <li>Pedro Parages</li>
                </ul>
                <p>Coach: Arthur Johnson</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
}