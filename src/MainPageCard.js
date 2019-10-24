import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Thumbnail from './Thumbnail.js';

class MainPageCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var className=`MainPageCard ${this.props.cls}`;
        var hgt = parseInt(this.props.height);
        return (
            <div className={className} style={{'--top': `${-hgt/2}px`}}>
                <Link to={`/recipe/${this.props.data.id}`}>
                    <div className={'MainPageCardInner'} style={{backgroundImage: `url(${this.props.data.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom'}}></div>
                </Link>
            </div>
        );
    }
}

export default MainPageCard;