import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';

import FoodMenu from "./components/Menu.js";
import Cart from "./components/Cart.js";
import cartService from "./services/CartService";

function App() {
  return (
    <div className="App">
      <Container>
          <Cart key={cartService.cartChangedLast}/>
          <FoodMenu/>
      </Container>
    </div>
  );
}

export default App;
