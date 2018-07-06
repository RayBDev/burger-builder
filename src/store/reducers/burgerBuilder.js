import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.8,
    meat: 2,
    bacon: 0.7
};

const inputIngredient = (state, action) => {
    let eventValue = parseInt(action.event.target.value, 10);
    let startingPrice = {...initialState}
    let newPrice = startingPrice.totalPrice;
    if(isNaN(eventValue) || eventValue < 0) {
        eventValue = state.ingredients[action.ingredientName];
    }
    for (let key in state.ingredients){
        if (key !== action.ingredientName) {
            newPrice += (state.ingredients[key] * INGREDIENT_PRICES[key]);
        } else {
            newPrice += (eventValue * INGREDIENT_PRICES[key]);
        }
    }
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: eventValue
        },
        totalPrice: newPrice
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.INPUT_INGREDIENT:
            return inputIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            let resetPrice = {...initialState}
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: resetPrice.totalPrice,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;