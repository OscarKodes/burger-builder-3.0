import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    // state can also be declared like this ====
    // contructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    changeIngredientHandler = (type, change) => {
        let countCopy = this.state.ingredients[type];
        change === "ADD" ? countCopy++ : countCopy--;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = countCopy;
        const priceChange = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = change === "ADD" ? oldPrice + priceChange : oldPrice - priceChange;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    render () {
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} /> 
                <BuildControls
                    ingredientChanged={this.changeIngredientHandler} />
            </React.Fragment>
        )
    }
};

export default BurgerBuilder;