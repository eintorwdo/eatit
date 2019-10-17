import React from 'react';
import MainPageCard from './MainPageCard.js'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {recipes: '', counter: 0};
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`).then(res => {
            console.log("123")
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
                items.push(<MainPageCard key={index} id={index} data={value} cls={clsName}/>);
            }
            this.setState({recipes: items});
        })
    }

    moveLeft = () => {
        if(this.state.recipes.length > 0){
            var left;
            var right;
            var rightInv;
            var leftInv;
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

            leftInv = (left == 0) ? this.state.recipes.length - 1 : left - 1;
            rightInv = (right == this.state.recipes.length - 1) ? 0 : right + 1;

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
                else if (index == leftInv){
                    clsName = 'invLeft';
                    rcp = React.cloneElement(value, {id: value.props.id, data: value.props.data, cls: clsName});
                    newRcps.push(rcp);
                }
                else if (index == rightInv){
                    clsName = 'invRight';
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
    }

    moveRight = () => {
        if(this.state.recipes.length > 0){
            var left;
            var right;
            var leftInv;
            var rightInv;
            var ctr = this.state.counter;
            ctr = (ctr == 0) ? this.state.recipes.length - 1 : ctr - 1;

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

            leftInv = (left == 0) ? this.state.recipes.length - 1 : left - 1;
            rightInv = (right == this.state.recipes.length - 1) ? 0 : right + 1;

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
                else if (index == leftInv){
                    clsName = 'invLeft';
                    rcp = React.cloneElement(value, {id: value.props.id, data: value.props.data, cls: clsName});
                    newRcps.push(rcp);
                }
                else if (index == rightInv){
                    clsName = 'invRight';
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
                return {counter: (state.counter == 0) ? state.recipes.length - 1 : state.counter - 1, recipes: newRcps};       //use this when neww val is computed based on prev state
            });
        }
    }

    render(){
        var recipes = this.state.recipes;
        return(
            <div className="col-md mt-2" id='homeBody'>
                <i className="fas fa-arrow-circle-left arrow" onClick={this.moveLeft}></i>
                <div className='MainPageCardsWrapper'>
                    {recipes}
                </div>
                <i className="fas fa-arrow-circle-right arrow" onClick={this.moveRight}></i>
            </div>
        );
    }
}
export default Home;