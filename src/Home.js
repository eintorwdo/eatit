import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="col-md-4 mt-2" id='homeBody'>
                <p id='homeText'>The best recipes you'll ever find! (on this page)</p>
            </div>
        );
    }
}
export default Home;