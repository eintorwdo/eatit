import React from 'react';

class ResultList extends React.Component{
    render(){
        var resultList = '';
        if(this.state.apiRes.results){
            var results = this.state.apiRes.results;
            resultList = (
                <div className="container mt-2">
                    <ul className="resultsList">
                        {results.map((val) => {
                            return (
                                <a href="#">
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

export default ResultList;