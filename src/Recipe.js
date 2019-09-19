import React from 'react';

class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {ingredients: ''};
        fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`).then(res => {
            return res.json();
        }).then(res => {
            // console.log(res);
            this.setState({ingredients: res});
        });
    }

    render(){
        var ingredients = this.state.ingredients;
        // console.log(ingredients.ingredients.length);
        var ingredientList;
        if(ingredients.ingredients){
            ingredientList = (
                <div>
                    <p>Ingredients:</p>
                    <ul>
                        {ingredients.ingredients.map(ingredient => {
                        return(
                                <li>{`${ingredient.name}: ${ingredient.amount.metric.value}${ingredient.amount.metric.unit}`}</li>
                        );
                    })}
                    </ul>
                </div>
            )
        }
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {ingredientList}
            </div>
        );
    }
}

export default Recipe;