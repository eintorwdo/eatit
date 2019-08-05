import React from 'react';

class Search extends React.Component{
    click(e){
        e.preventDefault();
        console.log('test');
    }
    
    render(){
        return(
            <div className="container-fluid mt-2">
                <form className="form-inline justify-content-center">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button onClick={this.click} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;