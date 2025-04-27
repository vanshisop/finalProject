import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';



const Galacticos = () => {
  
  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      }}>
        <div style={{
          width: '60%',
          height: '100%',
        }}>
          <h2>Regained Glory and a New Era</h2>
          <p>The year 2000 marked a seismic shift in Real Madrid’s history — not just on the pitch, but in the way the club envisioned its entire future. After winning their eighth Champions League title by defeating Valencia 3–0, Madrid was back on top of Europe. But Florentino Pérez, a businessman with grand ambitions, had an even bigger plan. In the summer of 2000, he won the club's presidential election, promising something radical: he would sign the biggest superstars in the world, year after year, and turn Real Madrid into not just a football team, but the most powerful brand in global sports.</p>
          <p>Pérez’s first move stunned the world — he triggered the massive release clause of ....</p>
        </div>
      </Parallax>
  );
};

export default Galacticos;