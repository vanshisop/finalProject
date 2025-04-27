import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';



const UCL = () => {
  
  return (
    <div>
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
          <h2>UCL</h2>
          <p>Madrid's quest to win UCL. Came close in 2012 but lost.... </p>
        </div>
      </Parallax>
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
          <h2>2014</h2>
          <p>Madrid is on the brink of La Decima but a solid performance by atletico. Madrid's losing 1-0 all hope's lost but with the last play of the game... </p>
        </div>
      </Parallax>
    </div>
  );
};

export default UCL;