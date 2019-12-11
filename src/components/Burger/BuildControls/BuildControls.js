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
           return <BuildControl key={ctrl.label} label={ctrl.label} />
        });

    return (
        <div className={classes.BuildControls}>
            {allControls}
        </div>
    )
};

export default buildControls;