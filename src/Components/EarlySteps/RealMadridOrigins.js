import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import realMadridImg from '../../img/madrid.jpg';
import spainMapImg from '../../img/spain-map.png';
import fairyImg from '../../img/prof.png'; 
import ParallaxComp from '../Parallax/Parallax';

export default function RealMadridOrigins() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundImage: `url(${spainMapImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
    }}>
      <ParallaxComp>
        {/* Fairy and text box section - positioned at 20% from top */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '0 40px',
          zIndex: 5,
        }}>
          {/* Fairy image: Prof Bryan */}
          <div style={{
            width: '200px',
            marginRight: '15px',
            marginTop: '-100px',
            position: 'relative',
            alignContent: 'top',
            zIndex: 2,
          }}>
            <img 
              src={fairyImg} 
              alt="Fairy" 
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          
          {/* Text box for angle  */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '10px',
            borderRadius: '8px',
            maxWidth: '1000px',
            position: 'relative',
            marginTop: '-100px',
            zIndex: 1,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}>
            <p style={{
              color: 'white',
              fontStyle: 'italic',
              fontSize: '20px',
              margin: 0,
              lineHeight: 1.5,
            }}>
              It was dark times for Spanish football. Until one day... "The year was 1902... and something magical was about to begin."
            </p>
          </div>
        </div>

        {/* Main theme */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          width: '100%',
          color: 'black',
          padding: '0 4px',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div className="flex-container" style={{
            backgroundColor: 'rgba(255, 255, 255, 0)',
            minHeight: '400px',
            top: '20%',
            display: 'flex',
            padding: '25px',
            borderRadius: '8px',
          }}>
            <div className="text-content">
              <h1>A Dynasty is Born (1902)</h1>
              {/* {text size change} */}
              <p style={{
                fontSize: '20px',
                color: 'white',
                textAlign: 'justify',

                margin: 0,
              }}>
                Real Madrid was founded on March 6, 1902, in Madrid, Spain, originally named Madrid Football Club </p>

            </div>
            <div className="image-content">
              {}
              <img src={realMadridImg} alt="Golden Era" />
            </div>
          </div>
        </div>
      </ParallaxComp>
    </div>
  );
}