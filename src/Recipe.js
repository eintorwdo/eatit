import React from 'react';
import Thumbnail from './Thumbnail';

class Recipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {ingredients: '', instructions: '', title: '', nutrition: '', nutritionFolded: true};
        fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`).then(async (test) => {
            var info = await test.json();
            var instr = [];
            if(info.analyzedInstructions.length > 0){
                instr = info.analyzedInstructions[0].steps;
            }
            var ingr = info.extendedIngredients;
            this.setState({ingredients: ingr, instructions: instr, title: info.title, nutrition: info.nutrition.nutrients});
        })
    }

    fold = () => {
        this.setState({nutritionFolded: !this.state.nutritionFolded});
    }

    render(){
        var ingredients = this.state.ingredients;
        var instructions = this.state.instructions;
        var nutrition = this.state.nutrition;
        var ingredientList;
        var instructionsList;
        var recipePhoto;
        var nutritionList;

        if(ingredients){
            ingredientList = (
                <div className='col-md-3'>
                    <ul className='list ingredientsList' style={{padding: '15px'}}>
                        <p><strong>Ingredients</strong></p>
                        {ingredients.map(ingredient => {
                        return(
                                <li className='ingredientsListItem'>{`${ingredient.original}`}</li>
                        );
                    })}
                    </ul>
                </div>
            );
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

        if(nutrition){
            var buttonClass;
            if(this.state.nutritionFolded){
                buttonClass = 'fold fas fa-chevron-down';
            }
            else{
                buttonClass = 'fold fas fa-chevron-up'
            }

            nutritionList = (
                <div className='col-md-3'>
                    <ul className='list nutrientsList' style={{padding: '15px 15px 1px 15px'}}>
                        <p><strong>Nutrition</strong></p>
                        {nutrition.map((nutrient,i) => {
                        var cls = 'ingredientsListItem folded'
                        var cssProps;
                        if(this.state.nutritionFolded && i>7){
                            cssProps = {
                                "--mrg": '0',
                                "--maxhgt": '0px'
                            }
                        }
                        else{
                            cssProps = {
                                "--mrg": '9px',
                                "--maxhgt": '24px'
                            }
                        }
                        return(
                                <li className={cls} style={cssProps}>{`${nutrient.title}: ${nutrient.amount}${nutrient.unit}`}</li>
                        );
                    })}
                    <i className={buttonClass} onClick={this.fold}></i>
                    </ul>
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
                {nutritionList}
            </div>
        );
    }
}

export default Recipe;