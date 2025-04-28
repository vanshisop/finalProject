import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import museum from '../img/museum.jpg'
import {Parallax } from 'react-scroll-parallax';
import TopPlayers from './TopPlayers';

gsap.registerPlugin(ScrollTrigger);

const Legacy = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayRef2 = useRef(null);  
  const overlayRef3 = useRef(null);  
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
  
      // Timeline for fading overlays
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%", // Total scroll distance
          scrub: true,
        }
      });
  
      // Step 1: Fade in overlayRef (start of scroll)
      tl.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1.2 }
      );
  
      // Step 2: Fade out overlayRef
      tl.to(overlayRef.current, 
        { opacity: 0, duration: 1 }
      );
  
      // Step 3: Fade in overlayRef2
      tl.fromTo(overlayRef2.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }
      );
      
      tl.to(overlayRef2.current,
        { opacity: 0 , duration: 1}, 
        )
      
      tl.fromTo(overlayRef3.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 1 }
          );

      
  
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
    backgroundImage: `url(${museum})`,
    backgroundSize: 'cover', // Ensure it covers the container, keeping aspect ratio
    backgroundPosition: 'top center', // Center the image
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
        maxWidth: '1000px',
        padding: '2rem',
        marginTop: '300px',
        }}>
        <p style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '30px',
            color: 'white',
            fontWeight: 'normal',
            lineHeight: '1.6',
            textAlign: 'justify',
            letterSpacing: '0.03em',
            textShadow: '0.5px 0.5px 1px rgba(155, 125, 85, 0.2)',
            padding: '1.5rem',
            borderLeft: '3px solid #8b6f47'
        }}>
            A tribute to Madrid
        </p>
        </div>

  </div>
  <div ref={overlayRef2} style={{
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
        maxWidth: '1000px',
        padding: '2rem',
        marginTop: '300px',
    }}>
       <p>Shreyash's custom</p>
    </div>
  </div>
  <div ref={overlayRef3} style={{
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
        maxWidth: '1000px',
        padding: '2rem',
        marginTop: '300px',
    }}>
      <p>Joshin's custom</p>
      
    </div>
  </div>


    </div>
  );
};

export default Legacy;