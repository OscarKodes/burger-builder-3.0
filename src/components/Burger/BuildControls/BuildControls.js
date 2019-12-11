import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
];

const buildControls = (props) => {

    const allControls = controls.map(ctrl => {
           return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    ingredientChanged={props.ingredientChanged}
                    disabled={props.disabled[ctrl.type]} />
        });

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {allControls}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.togglePurchase}>ORDER NOW</button>
        </div>
    )
};

export default buildControls;