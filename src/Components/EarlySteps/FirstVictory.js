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
                Soon they had the taste of victory and it was just the foundation for the legacy
              </p>
            </div>
          </div>
          
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <p style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold',
              margin: '1.0rem 0',
              color: '#000000',
              // textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)'
            }}>
              Spain's Copa Del Rey was Established
            </p>
            
            <div style={{
              margin: '20px 0',
              textAlign: 'center'
            }}>
              <img 
                src={require('../../img/copaestd.jpg')} 
                alt="Copa Del Rey Trophy" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  marginBottom: '20px',
                  maxHeight: '200px'
                }}
              />
            </div>
            
            <p style={{ 
              fontSize: '1.2rem',
              lineHeight: '1.6',
              color: '#000000',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
              In the early days of Spanish football, Madrid claimed their first trophy, 
              marking the beginning of what would become a legendary journey in football history.
            </p>
            
            <div style={{
              margin: '2rem 0',
              fontSize: '1.8rem',
              fontStyle: 'italic',
              color: '#000000',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              THE GAME BEGINS
            </div>
          </div>
        </div>
    </ParallaxComp>
  );
}