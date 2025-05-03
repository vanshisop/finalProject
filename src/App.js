import React, { useState, useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Timeline from './Components/Timeline';
import Trophies from './Components/Trophies';
import RealMadridOrigins from './Components/EarlySteps/RealMadridOrigins';
import Ramos from './Components/Ramos';
import CopaDelRey from './Components/EarlySteps/CopaDelRey';
import SantiagoScroll from './Components/Santiago';
import FirstPhoto from './Components/EarlySteps/FirstPhoto';
import LostDominance from './Components/Lost Dominance';
import Galacticos from './Components/Galacticos';
import GalacticoPhotos from './Components/GalacticoPhotos';
import GalacticoVis from './Components/GalacticoDataVis';
import Ronaldo from './Components/Ronaldo';
import UCL from './Components/UCL';
import ELClasicoVis from './Components/ElClasicoVis';
import SplashScreen from './Components/SplashScreen';
import './App.css';
import Legacy from './Components/Legacy';
import TopPlayers  from './Components/TopPlayers';

import Studio from './Components/Studio';
import Gallery from './Components/Gallery';
import FirstVictory from './Components/EarlySteps/FirstVictory';
import EarlySuccessAndLaliga from './Components/EarlySteps/EarlySuccessAndLaliga';
import EarlySuccessLineChart from './Components/EarlySteps/EarlySuccessLineChart';
import RealMadridToday from './Components/RealMadridToday';
gsap.registerPlugin(ScrollTrigger);


export default function App() {
  const [currentYear, setCurrentYear] = useState(1902);
  const [showTimeLine, setShowTimeLine] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [st1, setst1] = useState(false);
  const [st2, setst2] = useState(false);
  const [st3, setst3] = useState(false);
  const [ct1, setct1] = useState(false);
  const [ct2, setct2] = useState(false);
  const [ct3, setct3] = useState(false);
  const [tp1, settp1] = useState(0);
  const [tp2, settp2] = useState(0);
  const [tp3, settp3] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowTimeLine(true)
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercent = scrollPosition / (documentHeight - windowHeight);

    let newYear;

    if (scrollPercent <= 0.03) {
      setShowTimeLine(true);
      newYear = 1902;
    } else if (scrollPercent > 0.03 && scrollPercent <= 0.06) {
      setst1(true);
      setct1(true);
      newYear = 1903;
    } else if (scrollPercent > 0.06 && scrollPercent <= 0.09) {
      setct1(false);
      settp1(1);
      newYear = 1905;
    } else if (scrollPercent > 0.09 && scrollPercent <= 0.15) {
      setShowTimeLine(false);
      const overlayScrollPercent = (scrollPercent - 0.75) / 0.25;
      setOverlayOpacity(Math.min(1, Math.max(0, overlayScrollPercent)));
    } else if (scrollPercent > 0.18 && scrollPercent <= 0.24) {
      newYear = 1921;
      setShowTimeLine(true);
      settp1(5);
    } else if (scrollPercent > 0.24 && scrollPercent <= 0.27) {
      setst2(true);
      setct2(true);
      newYear = 1927;
    } else if (scrollPercent > 0.27 && scrollPercent <= 0.30) {
      setct2(false);
      setShowTimeLine(true);
      settp1(7);
      settp2(2);
      newYear = 1943;
    } else if (scrollPercent > 0.30 && scrollPercent <= 0.39) {
      setShowTimeLine(false);
    } 
    else if(scrollPercent > 0.39 && scrollPercent <= 0.44){
      setShowTimeLine(true)
      setst3(true)
      settp1(17)
      settp2(27)
      settp3(7)
      newYear = 1998
    }
    else if(scrollPercent > 0.44 && scrollPercent <= 0.48){
      settp3(8)
      newYear = 2000
    }
    else if(scrollPercent > 0.48 && scrollPercent <= 0.62){
      setShowTimeLine(false)
    }

    else if(scrollPercent > 0.62 && scrollPercent <= 0.65){
      setShowTimeLine(true)
      newYear = 2012
      settp1(18)
      settp2(32)
      settp3(9)
    }
    else if(scrollPercent > 0.65 && scrollPercent <= 0.68){
      newYear = 2014
      settp1(19)
      settp2(32)
      settp3(9)
    }
    else if(scrollPercent > 0.68 && scrollPercent <= 0.90){
      setShowTimeLine(false)
    }
    else if(scrollPercent > 0.90 && scrollPercent <= 0.93){
      setShowTimeLine(true)
      newYear = 2025
      settp1(20)
      settp2(36)
      settp3(15)
    }
    else{
      setShowTimeLine(false)
    }

    newYear = Math.max(1900, Math.min(2025, newYear));

    setCurrentYear(newYear);
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

      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ParallaxProvider>
      

        <div className="first-steps" style={{ position: "relative" }}>
          {showTimeLine && (
            <div
              style={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                gap: "20px",
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(8px)",
                padding: "10px 20px",
              }}
            >
              <Timeline currentYear={currentYear} />
              <Trophies
                currentYear={currentYear}
                showTrophy1={st1}
                showTrophy2={st2}
                showTrophy3={st3}
                circletrophy1={ct1}
                circletrophy2={ct2}
                circletrophy3={ct3}
                trophy1Count={tp1}
                trophy2Count={tp2}
                trophy3Count={tp3}
              />
            </div>
          )}

          <div style={{ paddingTop: "80px" }}>
            <RealMadridOrigins />
            <CopaDelRey />
            <FirstVictory/>
            <FirstPhoto />
            <div style={{ paddingTop: "80px" }}>
              <EarlySuccessAndLaliga/>
              <EarlySuccessLineChart/>
            
              <SantiagoScroll />
              <LostDominance />
              <Galacticos />
              <GalacticoPhotos />
              <GalacticoVis />
              <UCL />
              <Ramos />
              <ELClasicoVis />
              <RealMadridToday />  
              <Studio />
              <Gallery />
            </div>
          </div>
        </div>
     
    </ParallaxProvider>
  );
}
