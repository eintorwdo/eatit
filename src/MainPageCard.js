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
                <Thumbnail url={this.props.data.image} height={`${hgt}px`} />
                <p className='MainPageCardTitle'>{this.props.data.title}</p>
            </div>
        );
    }
}

export default MainPageCard;