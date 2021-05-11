import React, { Component } from 'react';
import { Button, Card, CardBody, Container, Table, TableBody, TableHead, Fa } from 'mdbreact';
import './OrderPreview.css';

class OrderPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log(this.props)
    return (
      <Container className="orderPreview-container my-3">
        <div className="orderPreview-type-billing">
          <h4 className="orderPreview-heading">Order Preview</h4>
          <h4 className="orderPreview-heading">Items</h4>
          <div className="orderPreview-itemContainer">
            {this.props.cart.map((item)=>(<div className="orderPreview-itemDetails">
              <div className="orderPreview-itemName">
                <p>{item.name} x {item.quantity}</p>
              </div>
              <div className="orderPreview-itemPrice">
                <p>$ {item.price * item.quantity}</p>
              </div>
            </div>))}
          </div>
          <h4 className="orderPreview-paymentHeading">Payment Details</h4>
          <div className="orderPreview-itemSubTotal">
            <div className="orderPreview-itemName">
              <p>Subtotal</p>
            </div>
            <div className="orderPreview-itemPrice">
              <p>$ {this.props.totalPrice}</p>
            </div>
          </div>
          <div className="orderPreview-itemSubTotal">
            <div className="orderPreview-itemName">
              <p>Grand Total</p>
            </div>
            <div className="orderPreview-itemPrice">
              <p>$ {this.props.totalPrice}</p>
            </div>
          </div>
          <h4 className="orderPreview-deliveryDetails">Delivery Details</h4>
          <p className="orderPreview-deliveryDetailItem">Name: {this.props.checkoutDetails.name}</p>
          <p className="orderPreview-deliveryDetailItem">Order Date: {new Date().toLocaleDateString()}</p>
          <p className="orderPreview-deliveryDetailItem">Estimated Time: {new Date().toLocaleTimeString()}</p>
          <p className="orderPreview-deliveryDetailItem">Mobile No: {this.props.checkoutDetails.phoneNumber}</p>
          <p className="orderPreview-deliveryDetailItem">Email ID: {this.props.checkoutDetails.email}</p>
          <p className="orderPreview-deliveryDetailItem">Billing Address: {this.props.checkoutDetails.address}</p>
          
          <h4 className="orderPreview-restaurantDetails">Restaurant Details</h4>
          <p className="orderPreview-restaurantDetailItem">Name: TL Pizzalaria</p>
          <p className="orderPreview-restaurantDetailItem">Mobile No: +123456789</p>
          <p className="orderPreview-restaurantDetailItem">Email ID: testapp@gmail.com</p>
          <p className="orderPreview-restaurantDetailItem">Address: Leeds,UK</p>
          
          
          <div className="orderPreview-billing-button">
            <button onClick={()=> this.props.history.push("/paymentOptions")} className="orderPreview-confirm-btn">Place Order</button>
          </div>



        </div>
      </Container>
    );
  }
}

export default OrderPreview;
