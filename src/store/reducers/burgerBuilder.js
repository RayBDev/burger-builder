import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
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

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
};

const setIngredients = (state, action) => {
    let resetPrice = {...initialState}
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: resetPrice.totalPrice,
                error: false,
                building: false
            };
};

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.INPUT_INGREDIENT:
            return inputIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default reducer;