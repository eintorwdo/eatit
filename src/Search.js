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
                <div className="col-md-4 mt-2" id='listCol'>
                    <ul className="resultsList">
                        {results.map((val) => {
                            return (
                                // <a href="#" key={val.id}>
                                    <li key={val.id}>
                                        <div className='row' id='searchResult'>
                                            <div className='col-md' id='thumbnail'>
                                                <img src={`https://spoonacular.com/recipeImages/${val.id}-90x90.jpg`}/>
                                            </div>

                                            <div className='col-md' id='title'>
                                                <a href="#" key={val.id}>{val.title}</a>
                                            </div>
                                        </div>
                                    </li>
                                // </a>
                            );
                        })}
                    </ul>

                    {/* <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav> */}

                </div>
            );
        }
        return resultList;
    }
}
export default Search;