import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients)
            .map(igKey => {
                return updatedIngredients[igKey];
            })
            .reduce((sum, num) => sum += num, 0);
        this.setState({purchaseable: sum > 0});
    }

    changeIngredientHandler = (type, change) => {
        let countCopy = this.state.ingredients[type];
        if (countCopy <= 0 && change === "MINUS") {
            return;
        }
        change === "ADD" ? countCopy++ : countCopy--;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = countCopy;
        const priceChange = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = change === "ADD" ? oldPrice + priceChange : oldPrice - priceChange;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    togglePurchaseHandler = () => {
        this.setState(prevState => {
            return {purchasing: !prevState.purchasing};
        });
    }

    purchaseContinueHandler = () => {
        alert("You continue.");
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    togglePurchase={this.togglePurchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        togglePurchase={this.togglePurchaseHandler}
                        purchaseContinue={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} /> 
                <BuildControls
                    ingredientChanged={this.changeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    togglePurchase={this.togglePurchaseHandler} />
            </React.Fragment>
        )
    }
};

export default BurgerBuilder;