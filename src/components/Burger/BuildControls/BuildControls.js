import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => ( 
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)} 
            removed={() => props.ingredientRemoved(ctrl.type)} 
            disabled={props.disabled[ctrl.type]} 
            igNum={props.igNum[ctrl.type]} 
            igChange={(event) => props.igChange(ctrl.type, event)}/>
        ))}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchasable} 
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'LOG IN TO ORDER'}</button>
    </div>
);

export default buildControls;