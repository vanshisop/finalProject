import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import figo from '../img/figo.jpeg';
import zidane from '../img/zidane.jpeg';
import ronaldoN from '../img/ronaldoN.png'
import beckham from '../img/beckham.jpg'
import ronaldo from '../img/ronaldo.jpg'
gsap.registerPlugin(ScrollTrigger);

const Santiago = () => {
  const sectionRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const bg4Ref = useRef(null);
  const bg5Ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section during scroll
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

      // Step 1: bg1 visible, bg2 invisible
      gsap.set(bg1Ref.current, { opacity: 1 });
      gsap.set(bg2Ref.current, { opacity: 0 });
      gsap.set(bg3Ref.current, { opacity: 0 });
      gsap.set(bg4Ref.current, { opacity: 0 });
      gsap.set(bg5Ref.current, { opacity: 0 });
      // Step 2: Transition from bg1 to bg2
      tl.to(bg1Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg2Ref.current, { opacity: 1, duration: 2 }, "<"); // "<" means start at the same time

      tl.to(bg2Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg3Ref.current, { opacity: 1, duration: 2 }, "<"); // "<" means start at the same time

      tl.to(bg3Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg4Ref.current, { opacity: 1, duration: 2 }, "<");

      tl.to(bg4Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg5Ref.current, { opacity: 1, duration: 2 }, "<");

    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* First Background */}
      <div ref={bg1Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${figo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 1,
      }} />

      {/* Second Background */}
      <div ref={bg2Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${zidane})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 2, // higher z-index so it layers above the first background
      }} />

<     div ref={bg3Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${ronaldoN})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 3, // higher z-index so it layers above the first background
      }} />

    <div ref={bg4Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${beckham})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 4, // higher z-index so it layers above the first background
      }} />

    <div ref={bg5Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${ronaldo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 5, // higher z-index so it layers above the first background
      }} />

  
        
    </div>
  );
};

export default Santiago;
