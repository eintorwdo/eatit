import React from 'react';
import queryString from 'query-string'

class Search extends React.Component{

    constructor(props){
        console.log("CONSTR");
        super(props);
        this.state = {apiRes: '', query: ''};
        var q = queryString.parse(this.props.location.search);
        // this.setState({query: this.props.location.search});
        this.state.query = this.props.location.search;
        fetch(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${q.query}&number=3`, {
            mode: 'cors'
        }).then(res => {
            return res.json();
        }).then(res => {
            this.setState({apiRes: res});
            // this.state.apiRes = res;
        });
    }

    componentDidUpdate(prevProps, prevState){
        var cur = this.props.location.search;
        console.log(this.props.location.search, this.state.query);
        var prev = '';
        if(this.state.query){
            prev = this.state.query;
        }
        if(cur !== prev){
            var q = queryString.parse(cur);
            fetch(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${q.query}&number=3`, {
            mode: 'cors'
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log("z fetchem", res);
                this.setState({apiRes: res, query: cur});
            });       
        }
        else{
            console.log("bez fetcha");
        }
    }

    render(){
        var resultList = '';
        if(this.state.apiRes.results){
            var results = this.state.apiRes.results;
            // console.log(results);
            resultList = (
                <div className="container mt-2">
                    <ul className="resultsList">
                        {results.map((val) => {
                            return (
                                <a href="#" key={val.id}>
                                    <li key={val.id}>{val.title}</li>
                                </a>
                            );
                        })}
                    </ul>
                </div>
            );
        }
        return resultList;
    }
}

export default Search;