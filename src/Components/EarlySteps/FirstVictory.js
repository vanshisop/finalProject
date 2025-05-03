import { Parallax } from 'react-scroll-parallax';
import React from 'react';

import ParallaxComp from '../Parallax/Parallax';
export default function FirstVictory() {
  return (
    <ParallaxComp>
        <div style={{
          width: '75%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h2>This victory marked the beginning of Madrid's dominance in Spanish football and was the first major title in the club's legendary history. It also kicked off a four-year streak, with Real winning the cup four consecutive times (1905–1908).</h2>
        </div>
    </ParallaxComp>
  );
}