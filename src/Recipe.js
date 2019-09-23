import React from 'react';

class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {ingredients: '', instructions: ''};
        fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`).then(res => {
            return res.json();
        }).then(res => {
            fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.id}/analyzedInstructions?apiKey=${process.env.REACT_APP_API_KEY}`).then(async (response) => {
                var inst = await response.json();
                console.log(inst[0].steps);
                this.setState({ingredients: res.ingredients, instructions: inst[0].steps});
            })
        });
    }

    render(){
        var ingredients = this.state.ingredients;
        var instructions = this.state.instructions;
        var ingredientList;
        var instructionsList;

        if(ingredients){
            ingredientList = (
                <div className='row'>
                    <div className='col-md'>
                        <p style={{textAlign: "center"}}><strong>Ingredients</strong></p>
                        <ul className='ingredientsList'>
                            {ingredients.map(ingredient => {
                            return(
                                    <li>{`${ingredient.name}: ${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}`}</li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
            )
        }

        if(instructions){
            instructionsList = (
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>
                        <p style={{textAlign: "center"}}><strong>Instructions:</strong></p>
                        <ul className='ingredientsList'>
                            {instructions.map(instruction => {
                            return(
                                    <li style={{marginBottom: "20px"}}>
                                        <p style={{textAlign: "center"}}><b>Step {`${instruction.number}`}</b></p>
                                        {`${instruction.step}`}
                                    </li>
                            );
                        })}
                        </ul>
                    </div>
                </div>
            );
        }
        return(
            <div>
                {ingredientList}
                {instructionsList}
            </div>
        );
    }
}

export default Recipe;