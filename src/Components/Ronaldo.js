import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';



const Ronaldo = () => {
  
  return (
    <div>
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      }}>
        <div style={{
          width: '60%',
          height: '100%',
        }}>
          <h2>Madrid's Greatest Galactico : Ronaldo</h2>
        </div>
      </Parallax>

  
    </div>

  );
};

export default Ronaldo;