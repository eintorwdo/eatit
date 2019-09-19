import React from 'react';

class Thumbnail extends React.Component{
    constructor(props){
        super(props);
        this.state = {loading: true};
    }

    renderSpinner = () => {
        if(this.state.loading == true){
            return <div className='loader'></div>
        }
        else{
            return null;
        }
    }

    imageLoadHandler = (e) => {
        e.target.classList.remove('invisible');
        this.setState({loading: false});
    }

    render(){
        return(
            <div>
                {this.renderSpinner()}
                <img src={this.props.url} onLoad={this.imageLoadHandler} className='thumbnailImg invisible'/>
            </div>
        );
    }
}

export default Thumbnail;