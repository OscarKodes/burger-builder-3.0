import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        err: false
    }

    componentDidMount () {
        axios.get("/ingredients.json")
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err => this.setState({err: true}));
    };

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
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Taylor Swift",
                address: {
                    street: "Golden Brick Rd",
                    zipCode: "12345",
                    country: "Paradise"
                },
                email: "Taylor@Swift.com"
            },
            deliverMethod: "Fastest"
        }

        axios.post("/orders.json", order)
            .then(res => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(err => {
                this.setState({loading: false, purchasing: false})
            });
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.err ? <p>Ingredients can't be loaded.</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} /> 
                    <BuildControls
                            ingredientChanged={this.changeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchaseable={this.state.purchaseable}
                            togglePurchase={this.togglePurchaseHandler} />
                </React.Fragment>
            );
            orderSummary = (
                <OrderSummary 
                ingredients={this.state.ingredients}
                togglePurchase={this.togglePurchaseHandler}
                purchaseContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        };
        
        return (
            <React.Fragment>
                <Modal
                    show={this.state.purchasing}
                    togglePurchase={this.togglePurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
};

export default withErrorHandler(BurgerBuilder, axios);