import React, {Component} from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    // this could be a functional component
    // declared as a class for demonstration purposes
    componentDidUpdate () {
        console.log("[OrderSummary] Did update");
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTranform: 'capitalize'}}>
                        {igKey}
                    </span>
                    : {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button 
                    clicked={this.props.togglePurchase}
                    btnType="Danger">CANCEL</Button>
                <Button 
                    clicked={this.props.purchaseContinue}
                    btnType="Success">CONTINUE</Button>
            </React.Fragment>
        );
    }
    
};

export default OrderSummary;