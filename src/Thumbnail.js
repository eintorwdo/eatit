import React from 'react';

class Thumbnail extends React.Component{
    constructor(props){
        super(props);
        this.state = {loading: true};
    }

    renderSpinner = () => {
        if(this.state.loading == true){
            if(this.props.height == '90px'){
                return <div className='loader'></div>;
            }
            else if(this.props.height == '393px'){
                return <div className='loaderBig'></div>;
            }
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
        if(this.props.height == '90px'){
            cls = 'thumbnailImg';
        }
        else if(this.props.height == '393px'){
            cls = 'bigImg';
        }
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {this.renderSpinner()}
                <img src={this.props.url} onLoad={this.imageLoadHandler} className={`${cls} invisible`}/>
            </div>
        );
    }
}

export default Thumbnail;