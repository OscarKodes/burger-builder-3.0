import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTranform: 'capitalize'}}>
                        {igKey}
                    </span>
                    : {props.ingredients[igKey]}
                </li>
            );
        });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button 
                clicked={props.togglePurchase}
                btnType="Danger">CANCEL</Button>
            <Button 
                clicked={props.purchaseContinue}
                btnType="Success">CONTINUE</Button>
        </React.Fragment>
    );
};

export default orderSummary;