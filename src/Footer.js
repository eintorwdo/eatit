import React from 'react';

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <footer className='footer'>
                <div className='row'>
                    <div className='col-md-6' style={{display: 'flex', justifyContent: 'center'}}>
                        <img src='./logo.png' style={{height: '90px', width: 'auto'}}></img>
                    </div>
                    <div className='col-md-6'>
                        <div className='col-md-6'>
                            <ul className='footer-list'>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <div className='col-md-6'>
                            
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;