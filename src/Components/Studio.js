import React, { useEffect, useRef } from 'react';
import TopPlayers from './TopPlayers';
import {Parallax } from 'react-scroll-parallax';
import uclTable from '../img/ucl_table.png'

const Studio = () => {
    
    return (

        <div className='studio' style={{position: 'relative', height: '100vh', backgroundImage:`url(${uclTable})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>

            <Parallax translateY={[0,0]} style={{
                      height: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                  <TopPlayers />
            </Parallax>

        </div>
    );
};

export default Studio;