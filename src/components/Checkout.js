import React, { Component } from 'react';
import { Button, Card, CardBody, Container, Table, TableBody, TableHead } from 'mdbreact';
import './Checkout.css';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutType: "delivery",
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      instruction: "",
    };
  }
  handleSubmite = () => {
    this.props.handleCheckout(this.state);
    this.props.history.push("/orderPreview");
  }

  render() {
    return (
      <Container className="checkout-container my-3">
        <div className="checkout-type-cont">
          <button onClick={() => this.setState({ checkoutType: "delivery" })} className={`checkout-type-btn ${this.state.checkoutType === "delivery" && "red-active"}`}>Delivery</button>
          <button onClick={() => this.setState({ checkoutType: "pickup" })} className={`checkout-type-btn ${this.state.checkoutType === "pickup" && "red-active"}`}>Pick Up</button>
        </div>
        <div className="checkout-type-billing">
          <h4 className="checkout-billing-heading">Billing Address</h4>
          <div className="checkout-billing-input">
            <input type="text" onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name} placeholder="Billing Name" className="checkout-billing-name" />
          </div>
          <div className="checkout-billing-input">
            <input type="text" onChange={(e) => this.setState({ phoneNumber: e.target.value })} value={this.state.phoneNumber} placeholder="Billing Number" className="checkout-billing-number" />
          </div>
          <div className="checkout-billing-input">
            <input type="text" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} placeholder="Billing Email" className="checkout-billing-email" />
          </div>
          <div className="checkout-billing-input">
            <textarea rows="4" onChange={(e) => this.setState({ address: e.target.value })} value={this.state.address} placeholder="Billing Address" className="checkout-billing-textarea" />
          </div>
          <div className="checkout-billing-checkbox">
            <input type="checkbox" name="" id="" /> <span>Delivery address different from billing address</span>
          </div>
          <h4 className="checkout-billing-heading">Instruction</h4>
          <div className="checkout-billing-input">
            <textarea onChange={(e) => this.setState({ instruction: e.target.value })} value={this.state.instruction} placeholder="Instruction" rows="6" className="checkout-billing-textarea" />
          </div>
          <div className="checkout-billing-input">
            <div class="radio-item">
              <input type="radio" id="ritema" name="ritem" value="ropt1" />
              <label for="ritema">As soon as possible</label>
            </div>
            <br />
            <div class="radio-item">
              <input type="radio" id="ritemb" name="ritem" value="ropt2" />
              <label for="ritemb">Later</label>
            </div>
          </div>
          <div className="checkout-billing-button">
            <button className="checkout-confirm-btn" onClick={()=> this.handleSubmite()}>Confirm</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default Checkout;
