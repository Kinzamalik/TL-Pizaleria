import React, { Component } from 'react';
import { Button, Card, CardBody, Container, Table, TableBody, TableHead, Fa } from 'mdbreact';
import './OrderComplete.css';
import Axios from 'axios'
class OrderComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleSubmit= async ()=>{
    var tokensToSent = JSON.parse(sessionStorage.getItem("quizAppToken"))

    var FCM_URL = "https://fcm.googleapis.com/fcm/send";

    var FCM_DATA = {
        registration_ids:[tokensToSent],
        collapse_key: "type_a",
        notification: {
            body: "Thank You for Shopping",
            title: "Your Order has been placed",
        },
        data: {
            body: "Thank You for Shopping",
            title: "Your Order has been placed",
        }
    }

    var FCM_HEADERS = {
        headers: {
            'Authorization': 'key=AAAAANu-E-s:APA91bGXP5zsxYOpEh4w0OsbA977uTsz4bx889howf79unCafiUTHbi6-jHw_P0BdUIMV5Lxn3TAOfPLnZNtwU42YPSOP5KrfkqAAtxOKOLh0wg5fXTUVu7xi4l4HseQqqBQkuJ-oiM8'
        }
    }
    try {
        var FCM_RESPONSE = await Axios.post(FCM_URL, FCM_DATA, FCM_HEADERS)
        // this.props.history.push("/")
      } catch (error) {
        console.log(error)
    }
  }
  render() {
    return (
      <Container className="orderPreview-container my-3">
        <div className="orderPreview-type-billing">
          <h4 className="orderPreview-heading">Order Confirmation</h4>
          <h4 className="orderPreview-heading">Your Order has been successfully placed and a reciept for your purchase has been sent to your Email ID</h4>
          <h4 className="orderPreview-heading-white">Order ID: Ap9343434 <br /> Payment Type Cash On Delivery</h4>
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
          
          <div className="orderPreview-billing-button">
            <button onClick={()=> this.handleSubmit()} className="orderPreview-confirm-btn">Place Order</button>
          </div>



        </div>
      </Container>
    );
  }
}

export default OrderComplete;
