import * as React from "react";

import cartService from "../services/CartService";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from "react-bootstrap/Container";

import Events from "../events.js"
import Button from "react-bootstrap/Button";

import CheckoutOrder from "./CheckoutOrder"


class Cart extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cart: null,
    };

    Events.EventsEmitter.subscribe(Events.EVENT_ACTIVE_CART_UPDATED, () => {
        this.loadData();
    });
  }

    componentDidMount () {
        this.loadData();
    }

    loadData() {
        this.loadCart();
    }

    loadCart() {
        cartService.getActiveCart().then(
            (result) => {
                this.setState({
                        isLoaded: true,
                        cart: result
                    }
                );
                this.render();
            }, (error) => {
                this.setState(
                    {
                        isLoaded: true,
                        error
                    }
                )
            }
        )
    }

    render() {
        const cart = this.state.cart;
        if (cart == null) {
            return ""
        }

        return(
            <div className="Cart">
                <Container>
                        {cart.items.map((item, key) =>
                            <div key={key}>
                                {item.menu_item.name} - {item.menu_item.price_value} X {item.quantity}
                            </div>
                        )}
                    <hr />
                    <div>{cart.items.length} items for <strong>{cart.total_sum}</strong> EUR</div>
                    <div>Delivery:  {cart.delivery_cost} EUR</div>
                    <hr />
                    <div>For payment: <strong>{cart.total_sum + cart.delivery_cost}</strong> EUR</div>
                    <CheckoutOrder/>
                </Container>
            </div>
        )
    }
}

export default Cart
