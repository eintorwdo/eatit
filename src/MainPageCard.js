import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux'

function select(state){
    return{
        homePageRecipes: state.homePageRecipes,
        counter: state.counter
    }
}

class MainPageCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {cls: this.chooseClass(this.props)};
    }

    chooseClass = (props) => {
        var left, right, leftInv, rightInv;
        if(props.counter == 0){
            left = props.homePageRecipes.length - 1;
            right = props.counter + 1;
        }
        else if(props.counter == props.homePageRecipes.length - 1){
            left = props.counter - 1;
            right = 0;
        }
        else{
            left = props.counter - 1;
            right = props.counter + 1;
        }

        leftInv = (left == 0) ? props.homePageRecipes.length - 1 : left - 1;
        rightInv = (right == props.homePageRecipes.length - 1) ? 0 : right + 1;

        if(props.id == left){
            return 'left';
        }
        else if(props.id == right){
            return 'right';
        }
        else if(props.id == props.counter){
            return 'ctr';
        }
        else if(props.id == leftInv){
            return 'invLeft';
        }
        else if(props.id == rightInv){
            return 'invRight';
        }
        else{
            return 'inv';
        }
    }

    componentWillReceiveProps(props){
        this.setState({cls: this.chooseClass(props)})
    }

    render(){
        var className=`MainPageCard ${this.state.cls}`;
        var hgt = parseInt(this.props.height);
        return (
            <div className={className} style={{'--top': `${-hgt/2}px`}}>
                <Link to={`/recipe/${this.props.data.id}`}>
                    <div className={'MainPageCardInner'} style={{backgroundImage: `url(${this.props.data.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom'}}></div>
                </Link>
            </div>
        );
    }
}

const ConnectMainPageCard = connect(select)(MainPageCard);

export default ConnectMainPageCard;