import React from 'react';

class MainPageCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var className=`MainPageCard ${this.props.cls}`;
        return (
            <div className={className}>
                <p>{this.props.id}</p>
            </div>
        );
    }
}

export default MainPageCard;