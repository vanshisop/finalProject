import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import elclasico from '../img/elclasico.jpg';
import text_ElClasico from '../img/transitions/topText_ELC.png';
import bg from '../img/transitions/elclasicobg.jpg';
gsap.registerPlugin(ScrollTrigger);

const ELClasicoVis = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const textRef = useRef(null); //

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      });

      gsap.fromTo(leftRef.current,
        { x: "-100%" },  
        {
          x: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
          }
        }
      );

      gsap.fromTo(rightRef.current,
        { x: "100%" },
        {
          x: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
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
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          top: '3%', // You can adjust this to where you want it to land
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%', // Size of the text image
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

    </div>
  );
};

export default ELClasicoVis;