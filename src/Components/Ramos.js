import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ramos from '../img/ramosss.jpg'
import ladecima from '../img/ladecima.jpeg'
gsap.registerPlugin(ScrollTrigger);

const Ramos = () => {
  const sectionRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const bg4Ref = useRef(null);
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
      // Step 2: Transition from bg1 to bg2
      tl.to(bg1Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg2Ref.current, { opacity: 1, duration: 2 }, "<"); // "<" means start at the same time

      tl.to(bg2Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg3Ref.current, { opacity: 1, duration: 2 }, "<"); // "<" means start at the same time

      tl.to(bg3Ref.current, { opacity: 0, duration: 2 });
      tl.to(bg4Ref.current, { opacity: 1, duration: 2 }, "<");

      tl.to(bg4Ref.current, { opacity: 0, duration: 2 });


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
        backgroundImage: `url(${ramos})`,
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
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 2, // higher z-index so it layers above the first background
      }} >
        <p>The most miracle of headers, in extra time this jubilant madrid side went on to win the entire UCL.</p>

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
        zIndex: 3, // higher z-index so it layers above the first background
      }} />

    <div ref={bg4Ref} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 4, // higher z-index so it layers above the first background
      }} >
        <h1>Real Madrid's UCL wins data vis map</h1>
      </div>


 
  
        
    </div>
  );
};

export default Ramos;
