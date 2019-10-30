
const initialState = {
    homePageRecipes: [],
    counter: 0
}

function rootReducer(state = initialState, action){
    if(action.type === "SET_HOMEPAGE_RECIPES"){
        var newArr = [...action.payload];
        return Object.assign({}, state, {
            homePageRecipes: newArr
        });
    }
    else if(action.type === "INCREMENT_COUNTER"){
        return Object.assign({}, state, {counter: (state.counter + 1)%state.homePageRecipes.length});
    }
    else if(action.type === "DECREMENT_COUNTER"){
        return Object.assign({}, state, {counter: (state.counter == 0) ? state.homePageRecipes.length - 1 : state.counter - 1});
    }
    return state;
}

export default rootReducer;