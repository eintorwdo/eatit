import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './Search.js';
require('dotenv').config()

class App extends React.Component {

  constructor(){
    super();
    this.state = {query: '#'};
  }

  onChange = (e) => {
    e.preventDefault();
    var q = document.getElementById("query").value;
    if(q.length > 0){
        this.setState({query: `/search?query=${q}`}, ()=>{
          document.getElementById("invisibleLink").click();
        });
    }
    else{
      this.setState({query: '#'}, ()=>{
        document.getElementById("invisibleLink").click();
      });
    }
  }

  render(){
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
                <li className="nav-item ml-2">
                  <form className="form-inline justify-content-center">
                    <input id="query" className="form-control mr-sm-2" type="search" placeholder="What's in your fridge?" aria-label="Search"/>
                    {/* <Link to={this.state.query}> */}
                        <button onClick={this.onChange} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    {/* </Link> */}
                    <Link to={this.state.query} id="invisibleLink"></Link>
                  </form>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <Route path="/search" component={Search} />
      </Router>
    );
  }
}

export default App;
