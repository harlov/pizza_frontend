import * as React from "react";

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button";
import AccordionContext from "react-bootstrap/cjs/AccordionContext";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import cartService from "../services/CartService";
import Table from "react-bootstrap/Table";


class CheckoutOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            cart: null,
        };

        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
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

    sendOrder() {

    }

    showDialog() {
        this.loadCart();
        this.setState({
            "show": true
        })
    }

    hideDialog() {
        this.setState({
            "show": false,
        })
    }

    renderOrderItems() {
        const cart = this.state.cart;

        if (cart == null) {
            return ""
        }

        return <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Quantity</td>
                    </tr>
                </thead>
                <tbody>
            {cart.items.map((item, key) =>
                <tr key={key}>
                    <td>{item.menu_item.name}</td>
                    <td>{item.menu_item.price_value}</td>
                    <td>{item.quantity}</td>
                    <td>remove</td>
                </tr>
            )}
            </tbody>
            </Table>
        </div>
    }

    renderClientInfo() {
        return "";
    }

    renderConfirm() {
        return "";
    }

    render() {
        return <div className="checkoutOrder">
            <Button onClick={this.showDialog} variant={"success"}>ORDER</Button>
            <Modal show={this.state.show}>
                <Modal.Header closeButton={true} onHide={this.hideDialog}>
                    <Modal.Title>Order checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">Items</Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>{this.renderOrderItems()}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header><Accordion.Toggle as={Button} variant="link" eventKey="1">Address and
                                contacts</Accordion.Toggle></Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>{this.renderClientInfo()}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header><Accordion.Toggle as={Button} variant="link"
                                                           eventKey="2">Confirmation</Accordion.Toggle></Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>{this.renderConfirm()}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Modal.Body>

            </Modal>
        </div>
    }
}

export default CheckoutOrder;
