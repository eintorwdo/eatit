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
                var left;
                var right;
                //below code mostly useless, but will be used later
                if(this.state.counter == 0){
                    left = res.recipes.length - 1;
                    right = this.state.counter + 1;
                    console.log(left, right);
                }
                else if(this.state.counter == res.recipes.length - 1){
                    left = this.state.counter - 1;
                    right = 0;
                }
                else{
                    left = this.state.counter - 1;
                    right = this.state.counter + 1;
                }


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

    render(){
        return(
            <div className="col-md mt-2" id='homeBody'>
                <i className="fas fa-arrow-circle-left"></i>
                <div className='MainPageCardsWrapper'>
                    {this.state.recipes}
                </div>
                <i className="fas fa-arrow-circle-right"></i>
            </div>
        );
    }
}
export default Home;