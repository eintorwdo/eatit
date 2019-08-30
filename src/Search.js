import React from 'react';
import queryString from 'query-string'


class Search extends React.Component{

    constructor(props){
        console.log("CONSTR");
        super(props);
        this.state = {apiRes: '', query: '', page: 1};
        var q = queryString.parse(this.props.location.search);
        // this.setState({query: this.props.location.search});
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
            var number = 5;
            var page = this.state.page;
            var offset = 0;
            if(q.page){
                if(page != parseInt(q.page)){
                    page = parseInt(q.page);
                    this.setState({page: page});
                }
                offset = (page - 1) * number;
            }
            fetch(`https://api.spoonacular.com/recipes/search?apiKey=${process.env.REACT_APP_API_KEY}&query=${q.query}&number=${number}&offset=${offset}`, {
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
        var pagination = '';
        if(this.state.apiRes.results){
            var results = this.state.apiRes.results;
            var lastPage = Math.ceil(this.state.apiRes.totalResults/5);
            console.log(this.state.apiRes.totalResults);
            console.log(lastPage);
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
                        <li className={cls}><a className="page-link" href="#">{val}</a></li>
                    );
                })

            resultList = (
                <div className="col-md-4 mt-2" id='listCol'>
                    <ul className="resultsList">
                        {results.map((val) => {
                            return (
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
                            );
                        })}
                    </ul>

                    <nav aria-label="Page navigation example" id='paginationNav'>
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            {/* <li className="page-item"><a className="page-link" href="#">{paginationArr[0]}</a></li> */}
                            {/* <li className="page-item"><a className="page-link" href="#">{paginationArr[1]}</a></li> */}
                            {/* <li className="page-item"><a className="page-link" href="#">{paginationArr[2]}</a></li> */}
                            {pagination}
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>

                </div>
            );
        }
        return resultList;
    }
}
export default Search;