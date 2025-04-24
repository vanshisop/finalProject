import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import santiago from '../img/santiago.png';
import real_madrid_1trophy from '../img/real_madrid_1trophy.jpg';

gsap.registerPlugin(ScrollTrigger);

const FirstPhoto = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin Section 4
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      });

      // Animation for Overlay in Section 4
      gsap.fromTo(overlayRef.current, {
        opacity: 0, y: 50,
      }, {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <div ref={sectionRef} style={{ height: '100vh', position: 'relative' }}>
  {/* Pinned Background (sticky) */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%', // Take full height of the section but not more
    width: '100%',
    backgroundImage: `url(${real_madrid_1trophy})`,
    backgroundSize: 'cover', // Ensure it covers the container, keeping aspect ratio
    backgroundPosition: 'center center', // Center the image
    zIndex: 1,
  }} />
  
  {/* Overlay Content */}
  <div ref={overlayRef} style={{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
  }}>
    <div style={{
      maxWidth: '800px',
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '2rem',
      borderRadius: '10px',
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
  );
};

export default FirstPhoto;