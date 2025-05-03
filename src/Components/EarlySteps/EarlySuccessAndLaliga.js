import { Parallax } from 'react-scroll-parallax';
import React from 'react';

import ParallaxComp from '../Parallax/Parallax';
export default function EarlySuccessAndLaliga() {
  return (
    <ParallaxComp>
            {/* */}
          <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: '30px',
            position: 'relative'
          }}>
            <img 
              src={require('../../img/prof.png')} 
              alt="Fairy" 
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                marginRight: '15px',
                marginTop: '-100px',
              }}
            />
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.58)',
              maxWidth: '1000px',
              textAlign: 'left',
              marginTop: '-100px',
            }}>
              <p style={{
                margin: 0,
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: '#333'
              }}>
                They had an early Copa Victory and La Liga Success (Another popular league in Spain)
              </p>
            </div>
          </div>
          <h2></h2>
          
          <div style={{
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img 
              src={require('../../img/haveall.png')} 
              alt="Early Success" 
              style={{
                maxWidth: '90%',
                //change size to 30%
                width: '30%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.72)',
              }}
            />
          </div>
        </div>
    </ParallaxComp>
  );
}