import { Parallax } from 'react-scroll-parallax';
import React from 'react';

import ParallaxComp from '../Parallax/Parallax';
export default function EarlySuccessAndLaliga() {
  return (
    <ParallaxComp>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h2>Early Copa Wins and La Liga Success</h2>
        </div>
    </ParallaxComp>
  );
}