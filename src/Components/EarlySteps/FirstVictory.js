import { Parallax } from 'react-scroll-parallax';
import React from 'react';

import ParallaxComp from '../Parallax/Parallax';
export default function FirstVictory() {
  return (
    <ParallaxComp>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h2>Real Madrid's first Win</h2>
        </div>
    </ParallaxComp>
  );
}