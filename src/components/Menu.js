import * as React from "react";
import Api from "../Api.js"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/Card";
import CardTitle from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import cartService from "../services/CartService";


class FoodMenu extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.handleOrderClick = this.handleOrderClick.bind(this);
  }

    componentDidMount () {
        this.loadData();
    }

    loadData() {
        Api.get("/menu/").then(
            (result) => {
                this.setState({
                        isLoaded: true,
                        items: result
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

    handleOrderClick(menu_item_uid) {
        cartService.addItemToActiveCart(menu_item_uid, 1).then(() => {
            console.log("item " + menu_item_uid + "was added to cart!");
        })
    }

    render() {
        const { items } = this.state;
        return <Container>
            <Row>
                {items.map((item, key) =>
                    <Card className="MenuItem" key={key}>
                        <img src="data:image/jpeg;base64,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"/>
                        <CardBody>
                            <CardTitle>
                                {item.name} - {item.price_value} {item.price_currency.name}
                                <Button className="addToOrderButton" onClick={(e) => this.handleOrderClick(item.uid) }>+</Button>
                            </CardTitle>

                        </CardBody>
                    </Card>
                )}
            </Row>
        </Container>
    }
}

export default FoodMenu;
