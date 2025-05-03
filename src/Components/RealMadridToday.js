import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';



const RealMadridToday = () => {
  
  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        paddingTop: '300px'
      }}>
        <div style={{
          width: '60%',
          height: '100%',
        }}>
          <h2>Real Madrid in 2025</h2>
          <p>What Real Madrid has been upto in 2025.</p>
        </div>
      </Parallax>
  );
};

export default RealMadridToday;