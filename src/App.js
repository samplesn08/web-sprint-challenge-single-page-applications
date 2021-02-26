import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from 'styled-components';
import pizza from './images/Pizza.jpg';
import pizzaPeople from './images/pizza-people.jpg';
import gsap from 'gsap';
import Form from './Form';

const H1 = styled.h1`
  color: crimson;
  font-size: 3rem;
`;

const tl = gsap.timeline({ paused: true, reversed: true });

tl.to('.main-img', 1, {
  width: '60%',
  ease: 'power2.easeOut'
}, '>-0.5'
).to('nav', 1, {
  height: '100%',
  ease: 'power2.easeOut'
}, '>-0.5'
).fromTo('.open', 0.5, {
  opacity: 0,
  x: 50,
  ease: 'power2.easeOut'
}, {
  opacity: 1,
  x: 0,
  }
);

function toggleTween(tween) {
  tween.reversed() ? tween.play() : tween.reverse();
}

const App = () => {
  return (
    <>
      <header>
        <nav>
          <div className="closed">
            <H1>Lambda Eats</H1>
            <Router>
              <Link onClick={() => toggleTween(tl)} to='/' style={{textDecoration: 'none', color: 'crimson'}}>Home</Link>
              <Link onClick={() => toggleTween(tl)} className='openForm' to='/pizza' style={{textDecoration: 'none', color: 'crimson'}}>Hungry?</Link>
            </Router>
          </div>
          <div className="open">
            <Form className='form'/>
            <div className='form-img'>
              <img src={pizzaPeople} alt="pizza"></img>
            </div>
          </div>
        </nav>
        <img className='main-img' src={pizza} alt='people eating pizza, taken from pexels'></img>
      </header>
    </>
  );
};
export default App;
