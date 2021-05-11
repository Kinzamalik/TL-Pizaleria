import React, { Component } from 'react';
import { Button, Card, CardBody, Container, Table, TableBody, TableHead,Fa } from 'mdbreact';
import './PaymentOptions.css';

class PaymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    return (
      <Container className="paymentType-container my-3">
        <div className="paymentType-type-cont">
          <button className="paymentType-type-btn">
          <Fa icon="credit-card" style={{fontSize: "20px"}} /> 

          </button>
        </div>
        <div className="paymentType-type-billing">
          <h4 className="paymentType-billing-heading">Cash on Delivery</h4>
          <div className="paymentType-billing-button">
            <button onClick={()=> this.props.history.push("/OrderComplete")} className="paymentType-confirm-btn">Confirm</button>
          </div>
        </div>
      </Container>
    );
  }
}

export default PaymentOptions;
