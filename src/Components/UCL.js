import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import news from '../img/6-2.png'
import ParallaxComp from './Parallax/Parallax';


const UCL = () => {
  
  return (
    <div>
    <ParallaxComp>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${news})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '300px'
      }}>
        </div>
      </ParallaxComp>

      <ParallaxComp>
        <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
  
          }}>
        </div>
      </ParallaxComp>
    </div>
  );
};

export default UCL;