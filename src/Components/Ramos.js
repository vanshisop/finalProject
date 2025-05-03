import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EuropeUCLs from './UCLMa';

import ramos from '../img/ramosss.jpg'
import ladecima from '../img/ladecima.jpeg'
import UCLMa from './UCLMa';
gsap.registerPlugin(ScrollTrigger);

const Ramos = () => {
  const sectionRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const bg4Ref = useRef(null);
  const bg5Ref = useRef(null);
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

      gsap.set(bg1Ref.current, { opacity: 0 });
      gsap.set(bg2Ref.current, { opacity: 0 });
      gsap.set(bg3Ref.current, { opacity: 0 });
      gsap.set(bg4Ref.current, { opacity: 0 });
      gsap.set(bg5Ref.current, { opacity: 1 });

      tl.to(bg5Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg1Ref.current, { opacity: 1, duration: 2 }, "<"); 
      
      tl.to(bg1Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg2Ref.current, { opacity: 1, duration: 2 }, "<"); 

      tl.to(bg2Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg3Ref.current, { opacity: 1, duration: 2 }, "<"); 

      tl.to(bg3Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg4Ref.current, { opacity: 1, duration: 2 }, "<");

      tl.to(bg4Ref.current, { opacity: 0, duration: 2 });


    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div ref={bg5Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(to bottom right, #f2f6fc, #dbe9f4)',
        color: '#001f5c',
        zIndex: 5,

      }}>
        <p style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          maxWidth: '800px',
          lineHeight: '1.5',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
        }}>
          24 May 2012 . Real Madrid reach the Champions League final after 12 long years .In the 36th minute, Diego Godín looped a header over Iker Casillas after a mistake from the keeper. Being 1-0 down Real Madrid looked down and out of the game...
        </p>
      </div>
      <div ref={bg1Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${ramos})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 1,
      }} />

<div ref={bg2Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(to bottom right, #f2f6fc, #dbe9f4)',
        color: '#001f5c',
        zIndex: 5,

      }}>
        <p style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          maxWidth: '800px',
          lineHeight: '1.5',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
        }}>
          With the most miracle of headers, Real Madrid went on to win the UCL in extra time and fulfilled the dream of La Decima. 
        </p>
      </div>

<     div ref={bg3Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${ladecima})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 3,
      }} />

    <div ref={bg4Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 4,
      }} >
        <div>
        <UCLMa/>
        </div>
      </div>
    </div>
  );
};

export default Ramos;
