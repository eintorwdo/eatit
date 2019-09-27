import React from 'react';
import Thumbnail from './Thumbnail';

class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {ingredients: '', instructions: ''};
        fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`).then(res => {
            return res.json();
        }).then(res => {
            fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.id}/analyzedInstructions?apiKey=${process.env.REACT_APP_API_KEY}`).then(async (response) => {
                var inst = '';    
                inst = await response.json();
                if(inst[0]){
                    inst = inst[0].steps
                }
                this.setState({ingredients: res.ingredients, instructions: inst});
            })
        });
    }

    render(){
        var ingredients = this.state.ingredients;
        var instructions = this.state.instructions;
        var ingredientList;
        var instructionsList;
        var recipePhoto;

        if(ingredients){
            ingredientList = (
                // <div className='row'>
                    <div className='col-md-3'>
                        {/* <p style={{textAlign: "center"}}><strong>Ingredients</strong></p> */}
                        <ul className='ingredientsList' style={{padding: '15px'}}>
                            <p style={{textAlign: "center"}}><strong>Ingredients</strong></p>
                            {ingredients.map(ingredient => {
                            return(
                                    <li>{`${ingredient.name}: ${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}`}</li>
                            );
                        })}
                        </ul>
                    </div>
                // </div>
            )
        }

        if(instructions){
            instructionsList = (
                    <div className='row'>
                        <div className='col-md' style={{padding: '20px'}}>
                            <p style={{textAlign: "center"}}><strong>Instructions:</strong></p>
                            <ul className='instructionsList'>
                                
                                {instructions.length > 0 ?
                                    (instructions.map(instruction => {
                                        return(
                                                <li style={{marginBottom: "20px"}}>
                                                    <p style={{textAlign: "center"}}><b>Step {`${instruction.number}`}</b></p>
                                                    {`${instruction.step}`}
                                                </li>
                                        );
                                    }))
                                    : (<p style={{textAlign: "center"}}>Sorry, no instructions found :(</p>)
                                }
                            </ul>
                        </div>
                    </div>
            );
        }

        recipePhoto = (
            <div className='row' style={{marginBottom: '40px'}}>
                <div className='col-md'>
                    <Thumbnail url={`https://spoonacular.com/recipeImages/${this.props.match.params.id}-636x393.jpg`} height='393px' />
                </div>
            </div>
        );

        var photoInstructions = (
            <div className='col-md-6'>
                {recipePhoto}
                {instructionsList}
            </div>
        );

        return(
            <div className='row recipeContent' style={{marginTop: '20px'}}>
                {ingredientList}
                {photoInstructions}
            </div>
        );
    }
}

export default Recipe;