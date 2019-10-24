import React from 'react';
import Thumbnail from './Thumbnail';

class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {ingredients: '', instructions: ''};
        fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`).then(async (test) => {
            var info = await test.json();
            var instr = info.analyzedInstructions[0].steps;
            var ingr = info.extendedIngredients;
            // console.log(info)
            this.setState({ingredients: ingr, instructions: instr, title: info.title});
        })
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
                            <p style={{textAlign: "right"}}><strong>Ingredients</strong></p>
                            {ingredients.map(ingredient => {
                            return(
                                    <li className='ingredientsListItem'>{`${ingredient.original}`}</li>
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

        var title = (
            <div className='row' style={{marginBottom: '30px'}}>
                <h2 style={{margin: '0 auto'}}>{this.state.title}</h2>
            </div>
        );

        recipePhoto = (
            <div className='row' style={{marginBottom: '40px'}}>
                <div className='col-md'>
                    <Thumbnail url={`https://spoonacular.com/recipeImages/${this.props.match.params.id}-636x393.jpg`} height='393px' />
                </div>
            </div>
        );

        var photoInstructions;
        if(ingredientList){
        photoInstructions = (
                <div className='col-md-6'>
                    {title}
                    {recipePhoto}
                    {instructionsList}
                </div>
            );
        }

        return(
            <div className='row recipeContent' style={{marginTop: '20px'}}>
                {ingredientList}
                {photoInstructions}
            </div>
        );
    }
}

export default Recipe;