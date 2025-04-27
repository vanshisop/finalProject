import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';



const LostDominance = () => {
  
  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        paddingTop: '300px'
      }}>
        <div style={{
          width: '60%',
          height: '100%',
        }}>
          <h2>Real Madrid's 1930s and Spanish Civil War</h2>
          <p>During the early years of La Liga, Real Madrid quickly established itself as one of the dominant forces in Spanish football. The club won its first La Liga title in 1932, cementing its place as a leading team in the country. Despite the disruptions caused by the Spanish Civil War (1936-1939), Real Madrid emerged from the conflict stronger and more focused. Under the leadership of President Santiago Bernabéu, who took office in 1943, Madrid began to regain its form and build a foundation for future success. Between 1930 and 1943, the club also claimed several Copa del Rey titles, with their triumph in 1943 standing out, where they famously defeated Barcelona 11-1 in the semi-finals. These early successes set the stage for the club's later dominance in Spanish and European football.</p>
        </div>
      </Parallax>
  );
};

export default LostDominance;