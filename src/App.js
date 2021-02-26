import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import pizza from './images/Pizza.jpg';
import pizzaPeople from './images/pizza-people.jpg';
import Form from './Form';

const H1 = styled.h1`
  color: crimson;
  font-size: 3rem;
`;

const App = () => {
  return (
    <>
      <header>
        <nav>
          <div className="closed">
            <H1>Lambda Eats</H1>
            <Router>
              <Link to='/' style={{textDecoration: 'none', color: 'crimson'}}>Home</Link>
              <Link to='/pizza' style={{textDecoration: 'none', color: 'crimson'}}>Pizza?</Link>
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
