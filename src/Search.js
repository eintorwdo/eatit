import React from 'react';

class Search extends React.Component{

    constructor(){
        super();
        this.state = {apiRes: ''};
    }

    click(e){
        e.preventDefault();
        var q = document.getElementById('query').value;
        fetch(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${q}&number=3`, {
            mode: 'cors'
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
        });
    }
    
    render(){
        return(
            <div className="container-fluid mt-2">
                <form className="form-inline justify-content-center">
                    <input id="query" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button onClick={this.click} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;