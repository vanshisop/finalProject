import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import realMadridImg from '../../img/madrid.jpg'

import ParallaxComp from '../Parallax/Parallax';
export default function RealMadridOrigins() {
  return (
   <ParallaxComp>
      <div style={{
        color: 'black',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
      }}>
      <div className="flex-container">
        <div className="text-content">
          <h1>A Dynasty is Born (1902)</h1>
          <p>
          Real Madrid was founded on March 6, 1902, in Madrid, Spain, originally named Madrid Football Club. The club was established by a group of football enthusiasts led by brothers Juan and Carlos Padrós, who organized the first official meeting. Just a few months later, the club played its first competitive match in the Copa de la Coronación, a precursor to the Copa del Rey. In 1920, King Alfonso XIII granted the club the title "Real" (Royal), along with the royal crown in its emblem. From the beginning, Real Madrid showed ambition and passion for the sport, quickly becoming one of the leading clubs in Spain. Their early matches were held at small local grounds, but their popularity steadily grew. These humble beginnings laid the foundation for what would become one of the most successful and iconic football clubs in history.
          </p>
        </div>
        <div className="image-content">
          <img src={realMadridImg} alt="Golden Era" />
        </div>
      </div>
      </div>
      </ParallaxComp>
  );
}
