import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //Create an array of ingredient names using prop object keys, then create a blank array with length of the prop object values and fill blank array with BurgerIngredient components. Using reduce to create single blank array if no ingredients are present.
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    .reduce((acc, curVal) => {
        return acc.concat(curVal)
    }, []);

    //Reorder ingredients due to server fetching alphabetization
    const ingredientOrder = ['lettuce', 'bacon', 'cheese', 'meat'];

    const sortedIngredients = []; 
    ingredientOrder.forEach((_, i) => {
        transformedIngredients.forEach(cur => {
            if(cur.props.type === ingredientOrder[i]) {
                sortedIngredients.push(cur);
            }
        })     
    });
    
    transformedIngredients = sortedIngredients;

    //Check if no ingredients added
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;