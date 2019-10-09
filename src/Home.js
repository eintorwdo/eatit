import React from 'react';
import MainPageCard from './MainPageCard.js'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {recipes: '', counter: 0};
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`).then(res => {
            return res.json();
        }).then(res => {
            const items = [];
            for(const[index, value] of res.recipes.entries()){
                var clsName = '';
                var left = res.recipes.length - 1;
                var right = this.state.counter + 1;
                if(index == left){
                    clsName = 'left';
                }
                else if(index == right){
                    clsName = 'right';
                }
                else if (index == this.state.counter){
                    clsName = 'ctr';
                }
                else{
                    clsName = 'inv';
                }
                items.push(<MainPageCard id={index} data={value} cls={clsName}/>);
            }
            this.setState({recipes: items});
        })
    }

    moveRight = () => {
        var left;
        var right;
        var ctr = this.state.counter;
        ctr = (ctr+1)%this.state.recipes.length;

        if(ctr == 0){
            left = this.state.recipes.length - 1;
            right = ctr + 1;
        }
        else if(ctr == this.state.recipes.length - 1){
            left = ctr - 1;
            right = 0;
        }
        else{
            left = ctr - 1;
            right = ctr + 1;
        }

        var clsName;
        var rcps = Array.from(this.state.recipes);
        var rcp;
        var newRcps = [];
        rcps.forEach((value, index) => {
            if(index == left){
                clsName = 'left';
                rcp = React.cloneElement(value, {id: value.props.id, data: value.props.data, cls: clsName});
                newRcps.push(rcp);
            }
            else if(index == right){
                clsName = 'right';
                rcp = React.cloneElement(value, {id: value.props.id, data: value.props.data, cls: clsName});
                newRcps.push(rcp);
            }
            else if (index == ctr){
                clsName = 'ctr';
                rcp = React.cloneElement(value, {id: value.props.id, data: value.props.data, cls: clsName});
                newRcps.push(rcp);
            }
            else{
                clsName = 'inv';
                rcp = React.cloneElement(value, {id: value.props.id, data: value.props.data, cls: clsName});
                newRcps.push(rcp);
            }
        })
            
        this.setState((state) => {
            return {counter: (state.counter+1)%state.recipes.length, recipes: newRcps};       //use this when neww val is computed based on prev state
        });
    }

    render(){
        var recipes = this.state.recipes;
        return(
            <div className="col-md mt-2" id='homeBody'>
                <i className="fas fa-arrow-circle-left"></i>
                <div className='MainPageCardsWrapper'>
                    {recipes}
                </div>
                <i className="fas fa-arrow-circle-right" onClick={this.moveRight}></i>
            </div>
        );
    }
}
export default Home;