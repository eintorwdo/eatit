import React from 'react';

class Thumbnail extends React.Component{
    constructor(props){
        super(props);
        this.state = {loading: true};
    }

    renderSpinner = () => {
        if(this.state.loading == true){
            return <div className='loader' style={{'--height': this.props.height}}></div>;
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
        var cls = '';
        if(this.props.height == '393px'){
            cls = 'bigImg';
        }
        else{
            cls = 'thumbnailImg';
        }
        return(
            <div style={{display: 'flex', justifyContent: 'center', overflow: 'hidden'}}>
                {this.renderSpinner()}
                <img src={this.props.url} onLoad={this.imageLoadHandler} className={`${cls} invisible`} style={{'--height': this.props.height}}/>
            </div>
        );
    }
}

export default Thumbnail;