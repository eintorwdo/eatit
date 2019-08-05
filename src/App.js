import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './Search.js';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link">Search Recipes</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <Route path="/search" component={Search} />
    </Router>
  );
}

export default App;
