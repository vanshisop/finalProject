import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import santiago from '../img/sanitago.png';
import real_madrid_1trophy from '../img/sanitago.png';
import Dominance from './Dominance';

gsap.registerPlugin(ScrollTrigger);

const Santiago = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayRef2 = useRef(null)  
  const overlayRef3 = useRef(null)  
  const overlayRef4 = useRef(null)   
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
          
       tl.to(overlayRef3.current,
            { opacity: 0 , duration: 1}, 
            )
      tl.fromTo(overlayRef4.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
              );
      tl.fromTo(overlayRef4.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.5 }
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
    backgroundImage: `url(${santiago})`,
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
        maxWidth: '1000px',
        padding: '2rem',
        marginTop: '300px',
        }}>
        <p style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '30px',
            color: '#3a3226',
            fontWeight: 'normal',
            lineHeight: '1.6',
            textAlign: 'justify',
            letterSpacing: '0.03em',
            textShadow: '0.5px 0.5px 1px rgba(155, 125, 85, 0.2)',
            padding: '1.5rem',
            borderLeft: '3px solid #8b6f47'
        }}>
            <span style={{ 
            fontSize: '34px', 
            color: '#5c4d3c', 
            fontFamily: '"IM Fell DW Pica SC", serif',
            fontWeight: 'bold',
            letterSpacing: '1px'
            }}>T</span>he reign of Santiago Bernabéu begins. With a vision to transform the world of football, Bernabéu took charge of the club, guiding it through new heights of success and cementing its place in history as one of the most iconic figures in football. His leadership changed not just the trajectory of the club, but also the sport itself, setting standards that would influence generations.
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
        <h2 style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '36px',
            color: '#3a3226',
            fontWeight: 'bold',
            lineHeight: '1.6',
            textAlign: 'center',
            letterSpacing: '0.03em',
            paddingBottom: '1rem',
            borderBottom: '2px solid #8b6f47',
        }}>
            The Birth of the European Championships
        </h2>
        <p style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '20px',
            color: '#3a3226',
            fontWeight: 'normal',
            lineHeight: '1.6',
            textAlign: 'justify',
            letterSpacing: '0.03em',
            textShadow: '0.5px 0.5px 1px rgba(155, 125, 85, 0.2)',
            padding: '1.5rem',
            borderLeft: '3px solid #8b6f47'
        }}>
            <span style={{
                fontSize: '34px',
                color: '#5c4d3c',
                fontFamily: '"IM Fell DW Pica SC", serif',
                fontWeight: 'bold',
                letterSpacing: '1px'
            }}>T</span>he inception of the European Championships marks a pivotal moment in the history of football. The first tournament, held in 1960, brought together the best teams from across Europe to compete for the prestigious title. This tournament, created to unify the continent through the love of the sport, paved the way for the future of international football. It has since evolved into one of the most-watched and celebrated sporting events, capturing the imagination of millions every four years.
        </p>
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
        <h2 style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '36px',
            color: '#3a3226',
            fontWeight: 'bold',
            lineHeight: '1.6',
            textAlign: 'center',
            letterSpacing: '0.03em',
            paddingBottom: '1rem',
            borderBottom: '2px solid #8b6f47',
        }}>
            Utter Ridiculous!!
        </h2>
        <p style={{
            fontFamily: '"IM Fell English", "Times New Roman", serif',
            fontSize: '20px',
            color: '#3a3226',
            fontWeight: 'normal',
            lineHeight: '1.6',
            textAlign: 'justify',
            letterSpacing: '0.03em',
            textShadow: '0.5px 0.5px 1px rgba(155, 125, 85, 0.2)',
            padding: '1.5rem',
            borderLeft: '3px solid #8b6f47'
        }}>
            <span style={{
                fontSize: '34px',
                color: '#5c4d3c',
                fontFamily: '"IM Fell DW Pica SC", serif',
                fontWeight: 'bold',
                letterSpacing: '1px'
            }}>R</span>eal Madrid wins first 5 European Championships in a row.
        </p>
    </div>
</div>
<div ref={overlayRef4} style={{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center',
  }}>
    <div style={{
        maxWidth: '1000px',
        padding: '2rem',
        marginTop: '300px',
    }}>
        
        <Dominance/>
    </div>
</div>

</div>
  );
};

export default Santiago;