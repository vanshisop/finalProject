import { Parallax } from 'react-scroll-parallax';
import realMadridImg from '../img/madrid.jpg'
import '../App.css';
export default function CopaDelRey() {
  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '140vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h2>Copa Del Rey was established</h2>
        </div>
      </Parallax>
  );
}
