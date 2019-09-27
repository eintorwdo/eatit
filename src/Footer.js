import React from 'react';
import {Link} from 'react-router-dom'
class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <footer className='footer'>
                <div className='row'>
                    <div className='col-md-6 logoWrapper' style={{display: 'flex', justifyContent: 'center'}}>
                        <img src='./logo.png' style={{height: '90px', width: 'auto'}}></img>
                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                        <div className='col-sm-6'>
                            <ul className='footer-list'>
                                <li><Link to='#'>Support</Link></li>
                                <li><Link to='#'>Terms and Conditions</Link></li>
                                <li><Link to='#'></Link></li>
                            </ul>
                        </div>
                        <div className='col-sm-6'>
                            <ul className='footer-list'>
                                <li><Link to='#'>Support</Link></li>
                                <li><Link to='#'>Terms and Conditions</Link></li>
                                <li><Link to='#'></Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;