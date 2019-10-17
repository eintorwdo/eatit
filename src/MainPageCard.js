import React from 'react';
import Thumbnail from './Thumbnail.js';

class MainPageCard extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.data)
    }

    render(){
        var className=`MainPageCard ${this.props.cls}`;
        return (
            <div className={className}>
                <Thumbnail url={this.props.data.image} height='150px' />
                <p className='MainPageCardTitle'>{this.props.data.title}</p>
            </div>
        );
    }
}

export default MainPageCard;