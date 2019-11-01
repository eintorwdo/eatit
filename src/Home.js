import React from 'react';
import ConnectMainPageCard from './MainPageCard.js'
import {connect} from 'react-redux'
import {setHomePageRecipes, incrementCounter, decrementCounter} from './actions/index.js'

function mapDispatchToProps(dispatch){
    return {
        setHomePageRecipes: homePageRecipes => dispatch(setHomePageRecipes(homePageRecipes)),
        incrementCounter: () => dispatch(incrementCounter()),
        decrementCounter: () => dispatch(decrementCounter())
    }
}

function select(state){
    return {
        homePageRecipes: state.homePageRecipes,
        counter: state.counter
    }
}

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {loading: true, switchingSlide: false};
        if(this.props.homePageRecipes.length == 0){
            fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`).then(res => {
            this.setState({loading: false});
            return res.json();
            }).then(res => {
                const items = [];
                for(const[index, value] of res.recipes.entries()){
                    items.push(<ConnectMainPageCard key={index} id={index} data={value} height='200'/>);
                }
                this.props.setHomePageRecipes(items);
            })
        }
        else{
            this.state.loading = false;
        }
    }

    moveLeft = () => {
        if(this.props.homePageRecipes.length > 0 && this.state.switchingSlide != true){
            this.setState({switchingSlide: true});
            this.props.incrementCounter();
            setTimeout(() => {
                this.setState({switchingSlide: false});
            }, 400);
        }
    }

    moveRight = () => {
        if(this.props.homePageRecipes.length > 0 && this.state.switchingSlide != true){
            this.setState({switchingSlide: true});
            this.props.decrementCounter();
            setTimeout(() => {
                this.setState({switchingSlide: false});
            }, 400);
        }
    }

    cloneMainPageCard = (value, clsName) => {
        return React.cloneElement(value, {id: value.props.id, data: value.props.data, cls: clsName});
    }

    moveElements = (rcps, left, right, leftInv, rightInv, ctr) => {
        var rcp;
        var newRcps = [];
        rcps.forEach((value, index) => {
            if(index == left){
                rcp = this.cloneMainPageCard(value, 'left');
                newRcps.push(rcp);
            }
            else if(index == right){
                rcp = this.cloneMainPageCard(value, 'right');
                newRcps.push(rcp);
            }
            else if (index == ctr){
                rcp = this.cloneMainPageCard(value, 'ctr');
                newRcps.push(rcp);
            }
            else if (index == leftInv){
                rcp = this.cloneMainPageCard(value, 'invLeft');
                newRcps.push(rcp);
            }
            else if (index == rightInv){
                rcp = this.cloneMainPageCard(value, 'invRight');
                newRcps.push(rcp);
            }
            else{
                rcp = this.cloneMainPageCard(value, 'inv');
                newRcps.push(rcp);
            }
        })
        return newRcps;
    }

    render(){
        var recipes = this.props.homePageRecipes;
        var ldg = null;
        if(this.state.loading){
            ldg = (
            <div className='MainLoading'>
                <p style={{textAlign: 'center', margin: '0 auto'}}>LOADING...</p>
            </div>)
        }
        return(
            <div className="col-md mt-2" id='homeBody'>
                <i className="fas fa-arrow-circle-left arrow" onClick={this.moveLeft}></i>
                <div className='MainPageCardsWrapper'>
                    {ldg}
                    {recipes}
                </div>
                <i className="fas fa-arrow-circle-right arrow" onClick={this.moveRight}></i>
            </div>
        );
    }
}

const ConnectHome = connect(select, mapDispatchToProps)(Home)

export default ConnectHome;