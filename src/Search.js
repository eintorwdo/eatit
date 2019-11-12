import React from 'react';
import Thumbnail from './Thumbnail.js';
import queryString from 'query-string'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { serialize } from 'v8';

class Search extends React.Component{

    constructor(props){
        // console.log("CONSTR");
        super(props);
        this.state = {apiRes: '', query: '', page: 1, expandFilter: false, columnsWrapped: false, diet:'', type:''};
        var q = queryString.parse(this.props.location.search);
        this.state.query = this.props.location.search;
        var number = 5;
        var page = 1;
        var offset = 0;
        this.collapseRef = React.createRef();
        this.expandRef = React.createRef();
        this.formRef = React.createRef();
        if(window.innerWidth < 768){
            this.state.columnsWrapped = true;
        }
        if(q.page && q.page != ''){
            page = parseInt(q.page);
            offset = (page - 1) * number;
            this.state.page = page;
        }
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${q.query}&number=${number}&offset=${offset}`, {
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
        if(cur !== prev || prevState.diet != this.state.diet || prevState.type != this.state.type){
            var q = queryString.parse(cur);
            var number = 5;
            var page = parseInt(q.offset) ? parseInt(q.offset)/number + 1 : 1;
            var offset = 0;
            if(q.offset){
                offset = (page - 1) * number;
            }
            fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${q.query}&number=${number}&offset=${offset}&diet=${this.state.diet}&type=${this.state.type}`, {
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

    expandFilter = () => {
        this.setState({expandFilter: true});
        this.formRef.current.classList.remove('collapsedForm');
    }

    collapseFilter = () => {
        this.setState({expandFilter: false});
        this.formRef.current.classList.add('collapsedForm');
    }

    submitFilter = (e) => {
        e.preventDefault();
        var data = new FormData(document.querySelector('.searchForm'));
        var options = {};
        for(var entry of data.entries()){
            if(entry[0] == 'diet'){
                options.diet = entry[1];
            }
            else if(entry[0] == 'meal'){
                options.type = entry[1];
            }
        }
        this.setState(options);
        
    }

    updateDimensions = () => {
        if(window.innerWidth < 768){
            this.setState({columnsWrapped: true});
        }
        else{
            this.setState({columnsWrapped: false});
        }
    }

    componentDidMount(){
        window.addEventListener('resize', this.updateDimensions);
    }

    render(){
        var resultList = '';
        var pagination = '';
        var dietList = ['vegetarian', 'gluten-free', 'ketogenic', 'vegan'];
        var mealTypes = ['breakfast', 'main-course', 'soup', 'dessert', 'drink', 'salad', 'appetizer'];
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

            var noResults=''
            if(results.length == 0){
                noResults = <p>Sorry, no results found...</p>
            }
            resultList = (
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
                        <li>{noResults}</li>
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
            );
        }

        var expButton = null;

        if(!this.state.expandFilter && this.state.columnsWrapped){
            expButton = <button ref={this.expandRef} onClick={this.expandFilter} className='filterExpandButton'>Rozwiń filtry</button>;
        }

        var searchFilter = (
            <div className='col-md-4 mt-2 mb-5' style={{paddingLeft: '50px', paddingRight: '50px'}}>
                <div ref={this.formRef} className='formCollapse collapsedForm' style={{overflow: 'hidden'}}>
                <i ref={this.collapseRef} onClick={this.collapseFilter} className="fas fa-times-circle filterCollapseButton"></i>
                    <form className='searchForm'>
                        <p style={{marginBottom: '2px'}} className='searchFormHeader'>Diet:</p>
                        {dietList.map((el) => {
                            return <Checkbox name={el} type='diet' />;
                        })}
                        <hr></hr>
                        <p style={{marginBottom: '2px'}} className='searchFormHeader'>Meal type:</p>
                        {mealTypes.map((type) => {
                            type = type.replace('-', ' ');
                            return <Checkbox name={type} type='meal' />;
                        })}
                        <button className='submitFilterButton' onClick={this.submitFilter}>Zastosuj filtry</button>
                    </form>
                </div>
                {expButton}
            </div>
        );


        return (
            <div className='row'>
                {searchFilter}
                {resultList}
            </div>
        );
    }
}

function Checkbox(props){
    return (
        <div className='checkboxWrapper'>
            <input type='radio' name={props.type}value={props.name}></input>
            <span style={{paddingLeft: '5px'}}>{props.name}</span>
        </div>
    );
}

export default Search;