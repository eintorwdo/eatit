import React from 'react';
import Thumbnail from './Thumbnail.js';

class MainPageCard extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.data)
    }

    render(){
        var className=`MainPageCard ${this.props.cls}`;
        var hgt = parseInt(this.props.height);
        return (
            <div className={className} style={{'--top': `${-hgt/2}px`}}>
                <div className={'MainPageCardInner'} style={{backgroundImage: `url(${this.props.data.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom'}}></div>
            </div>
        );
    }
}

export default MainPageCard;