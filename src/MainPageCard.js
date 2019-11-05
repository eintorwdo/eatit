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
        this.state = {cls: this.chooseClass(this.props), tooltipOffset: 0, shouldTooltipAppear: true, cardHover: false};
        this.titleRef = React.createRef();
        this.tooltipRef = React.createRef();
        this.mainpagecardRef = React.createRef();
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

    tooltipOffset = (tooltipWidth, mainpagecardWidth) => {
        return (mainpagecardWidth - tooltipWidth)/2;
    }

    setTooltip = () => {
        var titleWidth = this.titleRef.current.scrollWidth;
        var mainpagecardWidth = this.mainpagecardRef.current.offsetWidth;
        var tooltipWidth = this.tooltipRef.current.offsetWidth;
        if(tooltipWidth < mainpagecardWidth){
            var offset = this.tooltipOffset(tooltipWidth, mainpagecardWidth);
            this.setState({tooltipOffset: offset});
        }
        if(titleWidth <= mainpagecardWidth){
            this.setState({shouldTooltipAppear: false});
        }
        else{
            this.setState({shouldTooltipAppear: true});
        }
    }

    updateDimensions = () => {
        this.setTooltip();
    }

    mainpagecardMouseOver = () => {
        this.setState({cardHover: true});
    }

    mainpagecardMouseOut = () => {
        this.setState({cardHover: false});
    }

    componentWillReceiveProps(props){
        this.setState({cls: this.chooseClass(props)})
    }

    componentDidMount(){
        window.addEventListener('resize', this.updateDimensions);
        console.log(this.mainpagecardRef)
        this.mainpagecardRef.current.addEventListener('mouseover', this.mainpagecardMouseOver);
        this.mainpagecardRef.current.addEventListener('mouseout', this.mainpagecardMouseOut);
        this.setTooltip();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDimensions);
        this.mainpagecardRef.current.removeEventListener('mouseover', this.mainpagecardMouseOver);
        this.mainpagecardRef.current.removeEventListener('mouseout', this.mainpagecardMouseOut);
    }

    render(){
        var className=`MainPageCard ${this.state.cls}`;
        var hgt = parseInt(this.props.height);
        var tooltipStyle = {}
        if(this.state.tooltipOffset > 0){
            tooltipStyle = {
                paddingLeft: `${this.state.tooltipOffset}px`,
                paddingRight: `${this.state.tooltipOffset}px`
            }
            if(!this.state.shouldTooltipAppear){
                tooltipStyle.display = 'none';
            }
        }
        if(this.state.cardHover){
            tooltipStyle.visibility = 'visible';
            tooltipStyle.opacity = 1;
        }
        return (
            <div ref={this.mainpagecardRef} className={className} style={{'--top': `${-hgt/2}px`}}>
                <Link to={`/recipe/${this.props.data.id}`}>
                    <p className='MainPageCardTitle' ref={this.titleRef}>{this.props.data.title}
                    </p>
                    <p className='tip' style={tooltipStyle} ref={this.tooltipRef}>{this.props.data.title}</p>
                    <div className={'MainPageCardInner'} style={{backgroundImage: `url(${this.props.data.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom'}}></div>
                </Link>
            </div>
        );
    }
}

const ConnectMainPageCard = connect(select)(MainPageCard);

export default ConnectMainPageCard;