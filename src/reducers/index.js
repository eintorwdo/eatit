
const initialState = {
    homePageRecipes: []
}

function rootReducer(state = initialState, action){
    if(action.type === "SET_HOMEPAGE_RECIPES"){
        return Object.assign({}, state, {
            homePageRecipes: state.homePageRecipes.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;