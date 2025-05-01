import { Parallax } from 'react-scroll-parallax';
import React from 'react';
import '../../App.css';

export default function ParallaxComp({ children }) {
  return (
    <Parallax 
      translateY={[-20, 20]} 
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '90px'
      }}
    >
      {children}
    </Parallax>
  );
}
