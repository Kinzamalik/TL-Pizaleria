import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Items from './components/Items';
import Nav from './components/Nav';
import Cart from './components/Cart';
import firebase from './firebase';
import Categories from './components/Categories';
import Checkout from './components/Checkout';
import PaymentOptions from './components/PaymentOptions';
import OrderPreview from './components/OrderPreview';
import OrderComplete from './components/OrderComplete';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: 'https://reacteats-backend.herokuapp.com/items',
      cart: [],
      totalPrice: 0,
      totalQuantity: 0,
      cartLimit: 20000,
      geolocation:'',
      items:[{
        id: 1,
        itemName: "Brown and Egg Muffin",
        itemImg: "bacon-and-egg-muffin-original",
        itemCategory: "muffins",
        itemPrice: 500,
      },
      {
        id: 2,
        itemName: "Wraps and Rolls",
        itemImg: "wraps-and-rolls-original",
        itemCategory: "bbq-roll",
        itemPrice: 500,
      },
      {
        id: 3,
        itemName: "BBQ Roll",
        itemImg: "BBQ-roll-original",
        itemCategory: "bbq-roll",
        itemPrice: 500,
      },
      {
        id: 4,
        itemName: "Muffin",
        itemImg: "Muffin",
        itemCategory: "muffins",
        itemPrice: 500,
      },
      {
        id: 5,
        itemName: "Muffins",
        itemImg: "muffins-original",
        itemCategory: "muffins",
        itemPrice: 500,
      },
      {
        id: 6,
        itemName: "Muffins With Jam",
        itemImg: "muffin-with-jam-original",
        itemCategory: "muffins",
        itemPrice: 500,
      },
      {
        id: 7,
        itemName: "Bacon Roll",
        itemImg: "Bacon-roll-original",
        itemCategory: "muffins",
        itemPrice: 500,
      },
      {
        id: 8,
        itemName: "Blue Moon Ice-cream",
        itemImg: "Blue-moon-ice cream-original",
        itemCategory: "icecream",
        itemPrice: 500,
      },
      {
        id: 9,
        itemName: "Cappuccino",
        itemImg: "Cappuccino-original",
        itemCategory: "teas",
        itemPrice: 500,
      },
      {
        id: 10,
        itemName: "Chai",
        itemImg: "Chai-original",
        itemCategory: "teas",
        itemPrice: 500,
      },
      {
        id: 11,
        itemName: "Chocolate Milkshake",
        itemImg: "chocolate-milkshake-original",
        itemCategory: "milkshakes",
        itemPrice: 500,
      },
      {
        id: 12,
        itemName: "Classic Milkshake",
        itemImg: "classic-milkshake-orginal",
        itemCategory: "milkshakes",
        itemPrice: 500,
      },
      {
        id: 13,
        itemName: "Cocacola",
        itemImg: "cocacola-original",
        itemCategory: "softdrinks",
        itemPrice: 500,
      },
      {
        id: 14,
        itemName: "Cookie Milkshake",
        itemImg: "cookie-milkshake-original",
        itemCategory: "milkshakes",
        itemPrice: 500,
      },
      {
        id: 15,
        itemName: "Diet Coke",
        itemImg: "diet-coke-original",
        itemCategory: "softdrinks",
        itemPrice: 500,
      },
     
      {
        id: 16,
        itemName: "Double Bacon",
        itemImg: "doubleBacon",
        itemCategory: "bacon",
        itemPrice: 500,
      } ,{
        id: 16,
        itemName: "doubleBacon",
        itemImg: "double-bacon-and-egg-muffin-original",
        itemCategory: "bacon",
        itemPrice: 500,
      },
    ]
    };
  }
  componentDidMount() {
    this.requestMessaging();
  }
  handleAddToCart = (itemName,itemPrice,itemImg) => {
    let addedItems = { name: itemName, price: itemPrice,image:itemImg, quantity: 1 };
    let duplicate = false;
    if (this.state.totalPrice + addedItems.price > this.state.cartLimit) {
      return alert('Cart Limit Exceeded');
    }
    if (addedItems.name !== undefined) {
      this.state.cart.forEach((item, index) => {
        if (addedItems.name === item.name) {
          duplicate = true;
          this.setState(
            prevState => {
              const updatedCart = [...prevState.cart];
              updatedCart[index].quantity++;
              return { cart: updatedCart };
            },
            () => this.getCartQuantity(),
          );
        }
      });

      if (duplicate === false) {
        this.setState(
          prevState => ({
            cart: [...prevState.cart, addedItems],
          }),
          () => this.getCartQuantity(),
        );
      }
    }
  };

  getCartQuantity = () => {
    this.getTotalPrice();
    const updatedCart = [...this.state.cart];
    let quant = [];
    updatedCart.forEach(element => {
      quant.push(element.quantity);
    });
    quant = quant.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.setState(() => ({
      totalQuantity: quant,
    }));
  };

  getTotalPrice = () => {
    const updatedCart = [...this.state.cart];
    let total = [];
    updatedCart.forEach(element => {
      total.push(element.price * element.quantity);
    });
    total = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.setState(() => ({
      totalPrice: total,
    }));
  };

  handleDelete = index => {
    const updatedCart = [...this.state.cart];
    updatedCart.splice(index, 1);
    this.setState(
      () => ({
        cart: updatedCart,
      }),
      () => this.getCartQuantity(),
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = {
      quantity: event.target.dataset.orderquantity,
      price: event.target.dataset.orderprice,
      name: event.target.dataset.name,
      address: event.target.dataset.address,
      phone: event.target.dataset.phone,
    };

    fetch('https://reacteats-backend.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => {
      if (response.status === 201) {
        alert('Order submitted succesfully!');
        this.setState(
          () => ({
            cart: [],
          }),
          () => this.getCartQuantity(),
        );
      }
    });
  };
  requestMessaging = () => {
    const messaging = firebase.messaging();
    messaging.requestPermission().then(() => {
      return messaging.getToken()
    }).then((token) => {
      sessionStorage.setItem("quizAppToken", JSON.stringify(token))
    }).catch((err) => {
      console.log("User refused to recieve notifications")
    })
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          
            <Switch>
              <Route exact path="/" render={props => (
                <div>
                  <Nav showSearch={true} titleText="TL, Pizzaleria"  cart={this.state.cart} totalQuantity={this.state.totalQuantity} />
                  <div style={{ marginTop: "100px" }}>
                  <Categories subText={true} {...props} apiUrl={`${this.state.apiUrl}`} handleAddToCart={this.handleAddToCart} />
                  </div>
                </div>
              )} />
              <Route exact path="/items/:category" render={props => (
                <div>
                  <Nav showSearch={true} titleText="TL, Pizzaleria" cart={this.state.cart} totalQuantity={this.state.totalQuantity} />
                  <div style={{ marginTop: "100px" }}>
                  <Items {...props} apiUrl={`${this.state.apiUrl}`} items={this.state.items} handleAddToCart={this.handleAddToCart} />
                  </div>
                </div>
              )} />
              <Route exact path="/checkout" render={props => (
                <div>
                  <Nav showSearch={false} titleText="Check Out" cart={this.state.cart} totalQuantity={this.state.totalQuantity} />
                  <div style={{ paddingTop: "40px"}}>
                  <Checkout {...props} handleCheckout={(data)=> this.setState({checkoutDetails: data})} apiUrl={`${this.state.apiUrl}`} handleAddToCart={this.handleAddToCart} />
                  </div>
                </div>
              )} />
              <Route exact path="/paymentOptions" render={props => (
                <div>
                  <Nav showSearch={false} titleText="Payment Options" cart={this.state.cart} totalQuantity={this.state.totalQuantity} />
                  <div style={{ paddingTop: "40px"}}>
                  <PaymentOptions {...props} apiUrl={`${this.state.apiUrl}`} handleAddToCart={this.handleAddToCart} />
                  </div>
                </div>
              )} />
               <Route exact path="/orderPreview" render={props => (
                <div>
                  <Nav showSearch={false} titleText="Order Preview" cart={this.state.cart} totalPrice={this.state.totalPrice} totalQuantity={this.state.totalQuantity} />
                  <div style={{ paddingTop: "40px"}}>
                  <OrderPreview checkoutDetails={this.state.checkoutDetails} cart={this.state.cart} totalPrice={this.state.totalPrice}  {...props} apiUrl={`${this.state.apiUrl}`} handleAddToCart={this.handleAddToCart} />
                  </div>
                </div>
              )} />
              <Route exact path="/orderComplete" render={props => (
                <div>
                  <Nav showSearch={false} titleText="Thanks" cart={this.state.cart} totalQuantity={this.state.totalQuantity} />
                  <div style={{ paddingTop: "40px"}}>
                  <OrderComplete checkoutDetails={this.state.checkoutDetails} {...props} apiUrl={`${this.state.apiUrl}`} cart={this.state.cart} totalPrice={this.state.totalPrice} handleAddToCart={this.handleAddToCart} />
                  </div>
                </div>
              )} />
              <Route exact path="/cart" render={props => (
                <div>
                  <Nav showSearch={false} titleText="Cart" cart={this.state.cart} totalQuantity={this.state.totalQuantity} />
                  <div style={{ paddingTop: "40px"}}>
                  <Cart {...props} totalQuantity={this.state.totalQuantity} totalPrice={this.state.totalPrice} handleDelete={this.handleDelete} handleSubmit={this.handleSubmit} cart={this.state.cart} />
                  </div>
                </div>
              )} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
