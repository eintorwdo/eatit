import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './Search.js';
import Home from './Home.js';
require('dotenv').config()

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {query: '#'};
  }

  onChange = (e) => {
    e.preventDefault();
    var q = document.getElementById("query").value;
    if(q.length > 0){
        this.setState({query: `/search?query=${q}`}, ()=>{
          document.getElementById("srcLink").click();
        });
    }
    else{
      this.setState({query: '#'}, ()=>{
        document.getElementById("srcLink").click();
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
                    <Link to={this.state.query} className="invisibleLink" id='srcLink'></Link>
                  </form>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* <div className='row'>
          <div className="col-md mt-2">
            
          </div>

          <div className="col-md-4 mt-2">
            {this.props.main}
          </div>

          <div className="col-md mt-2">
            
          </div>
        </div> */}

        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
      </Router>
    );
  }
}

export default App;
