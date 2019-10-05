import React from 'react';
import {Link} from 'react-router-dom';
import Map from './Map.js';
class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <footer className='footer'>
                <div className='row'>
                    <div className='col-md socials'>
                        <Link to='#'><i className="fab fa-facebook socialIcon fb"></i></Link>
                        <Link to='#'><i className="fab fa-instagram socialIcon ig"></i></Link>
                        <Link to='#'><i className="fab fa-twitter socialIcon tt"></i></Link>
                        <Link to='#'><i className="fab fa-youtube socialIcon yt"></i></Link>
                    </div>
                </div>
                <div className='row upperFooter'>
                    <div className='col-md-6 logoWrapper' style={{display: 'flex', justifyContent: 'center'}}>
                        <img src='./logo.png' style={{height: '90px', width: 'auto'}}></img>
                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <ul className='footer-list'>
                                    <li><Link to='#'>Link1</Link></li>
                                    <li><Link to='#'>Link2</Link></li>
                                    <li><Link to='#'>Link3</Link></li>
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
                <div className='row'>
                    <div className='col-md'>
                        <Map coords='50.02948,19.90618'/>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;