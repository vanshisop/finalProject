import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';



const GalacticoVis = () => {
  
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
          <h2>Real Madrid's Greatest Vis</h2>
        </div>
      </Parallax>
  );
};

export default GalacticoVis;