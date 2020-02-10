import * as React from "react";

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button";
import AccordionContext from "react-bootstrap/cjs/AccordionContext";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";


class CheckoutOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            show: false,
        };

        this.showDialog = this.showDialog.bind(this);
    }

    showDialog () {
        this.setState({
            "show": true
        })
    }

    render() {
        return <div className="checkoutOrder">
            <Button onClick={this.showDialog} variant={"success"} >ORDER</Button>
            <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order checkout</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Accordion defaultActiveKey="0">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">Items</Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>ORDER ITEMS</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header><Accordion.Toggle as={Button} variant="link" eventKey="1">Address and contacts</Accordion.Toggle></Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>Client info</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header><Accordion.Toggle as={Button} variant="link" eventKey="2">Confirmation</Accordion.Toggle></Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>CONFIRM</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Modal.Body>

            </Modal>
        </div>
    }
}

export default CheckoutOrder;
