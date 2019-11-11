import React from 'react';
import Thumbnail from './Thumbnail.js';
import queryString from 'query-string'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Search extends React.Component{

    constructor(props){
        // console.log("CONSTR");
        super(props);
        this.state = {apiRes: '', query: '', page: 1};
        var q = queryString.parse(this.props.location.search);
        this.state.query = this.props.location.search;
        var number = 5;
        var page = 1;
        var offset = 0;
        if(q.page && q.page != ''){
            page = parseInt(q.page);
            offset = (page - 1) * number;
            this.state.page = page;
        }
        fetch(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${q.query}&number=${number}&offset=${offset}`, {
            // mode: 'cors'
        }).then(res => {
            return res.json();
        }).then(res => {
            this.setState({apiRes: res});
        });
    }

    pageUpdate = (next) => {
        var nxtPg;
        if(next){
            nxtPg = this.state.page + 1;
        }
        else{
            nxtPg = this.state.page - 1;
            if(nxtPg < 1){
                nxtPg = 1;
            }
        }
        var number = 5;
        var offset = (nxtPg - 1) * number;
        return [number, offset, nxtPg];
    }

    nextPage = (e) => {
        e.preventDefault();
        var cur = this.props.location.search;
        var q = queryString.parse(cur).query;
        var numOff = this.pageUpdate(true);
        this.setState({page: numOff[2], query: `?query=${q}&number=${numOff[0]}&offset=${numOff[1]}`}, ()=>{
            document.getElementById('pagLink').click();
        });
    }

    prevPage = (e) => {
        e.preventDefault();
        var cur = this.props.location.search;
        var q = queryString.parse(cur).query;
        var numOff = this.pageUpdate(false);
        this.setState({page: numOff[2], query: `?query=${q}&number=${numOff[0]}&offset=${numOff[1]}`}, ()=>{
            document.getElementById('pagLink').click();
        });
    }

    changePage = (e) => {
        e.preventDefault();
        var page = parseInt(e.target.innerHTML);
        var number = 5;
        var offset = (page - 1) * number;
        var cur = this.props.location.search;
        var q = queryString.parse(cur).query;
        this.setState({page: page, query: `?query=${q}&number=${number}&offset=${offset}`}, ()=>{
            document.getElementById('pagLink').click();
        });
    }

    componentDidUpdate(prevProps, prevState){
        var cur = this.props.location.search;
        var prev = '';
        if(this.state.query){
            // prev = this.state.query;
            prev = prevProps.location.search;
        }
        if(cur !== prev){
            var q = queryString.parse(cur);
            var number = 5;
            var page = parseInt(q.offset) ? parseInt(q.offset)/number + 1 : 1;
            var offset = 0;
            if(q.offset){
                offset = (page - 1) * number;
            }
            fetch(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${q.query}&number=${number}&offset=${offset}`, {
            mode: 'cors'
            }).then(res => {
                return res.json();
            }).then(res => {
                // console.log("z fetchem", res);
                this.setState({apiRes: res, query: cur, page: page});
            });       
        }
        else{
            // console.log("bez fetcha");
        }
    }

    render(){
        var resultList = '';
        var pagination = '';
        if(this.state.apiRes.results){
            var results = this.state.apiRes.results;
            var lastPage = Math.ceil(this.state.apiRes.totalResults/5);
            var curPage = this.state.page;
            var paginationArr = [];
            if(curPage == 1){
                if(lastPage >= 3){
                    paginationArr = [1,2,3];
                }
                else if(lastPage == 2){
                    paginationArr.length = lastPage - 1;
                    paginationArr.forEach((val, index) => {
                        paginationArr[index] = index + 1;
                    })
                }
                else{
                    paginationArr = [1];
                }
            }
            else if(curPage == lastPage){
                paginationArr = [lastPage-2,lastPage-1,lastPage];
            }
            else{
                paginationArr = [curPage-1,curPage,curPage+1];
            }

            pagination = 
                paginationArr.map((val) => {
                    var cls = 'page-item';
                    if(val == curPage){
                        cls = `${cls} active`;
                    }
                    return(
                        <li className={cls}><button className="page-link" onClick={this.changePage}>{val}</button></li>
                    );
                })

            resultList = (
                <div className='row'>
                    <div className='col-md-4 mt-2' style={{paddingLeft: '50px', paddingRight: '50px'}}>
                        <div>
                        <form className='searchForm'>
                            <p style={{marginBottom: '2px'}} className='searchFormHeader'>Diet:</p>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='veg' value='vegetarian'></input>
                                <span style={{paddingLeft: '5px'}}>vegatarian</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='glut' value='glut'></input>
                                <span style={{paddingLeft: '5px'}}>gluten free</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='keto' value='keto'></input>
                                <span style={{paddingLeft: '5px'}}>ketogenic</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='vegan' value='vegan'></input>
                                <span style={{paddingLeft: '5px'}}>ketogenic</span>
                            </div>
                            <hr></hr>
                            <p style={{marginBottom: '2px'}} className='searchFormHeader'>Meal type:</p>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='bfs' value='bfs'></input>
                                <span style={{paddingLeft: '5px'}}>breakfast</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='main' value='main'></input>
                                <span style={{paddingLeft: '5px'}}>main course</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='soup' value='soup'></input>
                                <span style={{paddingLeft: '5px'}}>soup</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='dessert' value='dessert'></input>
                                <span style={{paddingLeft: '5px'}}>dessert</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='drink' value='drink'></input>
                                <span style={{paddingLeft: '5px'}}>drink</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='salad' value='salad'></input>
                                <span style={{paddingLeft: '5px'}}>salad</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}} className='checkboxWrapper'>
                                <input type='checkbox' name='appetizer' value='appetizer'></input>
                                <span style={{paddingLeft: '5px'}}>appetizer</span>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="col-md-4 mt-2" id='listCol'>
                        <ul className="resultsList">
                            {results.map((val) => {
                                return (
                                    <li key={val.id}>
                                        <div className='row' id='searchResult'>
                                            <div className='col-md' id='thumbnail'>
                                                <Thumbnail url={`https://spoonacular.com/recipeImages/${val.id}-90x90.jpg`} height='90px' />
                                            </div>

                                            <div className='col-md' id='title'>
                                                <Link to={`/recipe/${val.id}`} key={val.id}>{val.title}</Link>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <nav aria-label="Page navigation example" id='paginationNav'>
                            <ul className="pagination">
                                <li className="page-item"><button className="page-link" onClick={this.prevPage}>Previous</button></li>
                                {pagination}
                                <li className="page-item"><button className="page-link" onClick={this.nextPage}>Next</button></li>
                                <Link to={this.state.query} className='invisibleLink' id='pagLink'></Link>
                            </ul>
                        </nav>

                    </div>
                </div>
            );
        }
        return resultList;
    }
}
export default Search;