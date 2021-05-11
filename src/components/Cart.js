import React, { Component } from 'react';
import { Button, Card, CardBody, Container, Table, TableBody, TableHead, Fa } from 'mdbreact';

import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processOrder: false,
      name: '',
      address: '',
      phone: '',
    };
  }

  finalizeOrder = () => {
    this.setState({ processOrder: true });
  };

  handleName = event => {
    this.setState({ name: event.target.value });
  };

  handleAddress = event => {
    this.setState({ address: event.target.value });
  };

  handlePhone = event => {
    this.setState({ phone: event.target.value });
  };

  render() {
    return (
      <Container className="cart-container my-3">
        <div className="cart-items-cont" style={{display:"flex !important"}}>
          {this.props.cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-imgCont">
                <img className="cart-item-img" src={require(`../images/bacon-and-egg-muffin-original.jpg`)} alt="" />
                <button onClick={()=> this.props.handleDelete(index)} className="cart-item-removeBtn"><Fa icon="times" className="text-white"></Fa></button>
              </div>
              <div className="cart-item-detail">
              <div className="cart-item-halfTop">
                  {item.name}
                </div>
                <div className="cart-item-halfBottom">
                $ {item.price}

                </div>
              </div>
              <div className="cart-item-actions">
                <div className="cart-item-less">
                <Fa icon="minus" className="text-white"></Fa>
                </div>
                <div className="cart-item-quantity">
                  {item.quantity}
                </div>
                <div className="cart-item-add">
                <Fa icon="plus" className="text-white"></Fa>
                </div>
              </div>
            </div>
          ))}
<p style={{textAlign:"center",color:'#fff',fontSize:"10px",width:'100%'}}>Total Payable Amount  <span style={{color:'#f00'}}>$ {this.props.totalPrice}</span></p>
        <input type="text" placeholder="Coupon Code" style={{width:'80%'}} /><button style={{backgroundColor:"#f00",color:'#fff',width:"20%"}}>Apply</button>
        
            <h4 style={{textAlign:'center',color:'#f00',fontSize:"16px",width:'100%',marginTop:"30px"}}>Payment Details</h4>
            
        </div>
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
        {/* <Card>
          <CardBody>
            <Table striped responsive className="table product-table">
              <TableHead color="indigo darken-3" textWhite>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </TableHead>
              <TableBody>
                {this.props.cart.map((item, index) => (
                  <tr key={item.name}>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">{item.price}</td>
                    <td className="align-middle">{item.quantity}</td>
                    <td className="align-middle">
                      <Button color="danger" data-index={index} onClick={this.props.handleDelete}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                {this.props.totalQuantity !== 0 ? (
                  <tr className="table-dark text-dark">
                    <td className="align-middle">
                      <h6 className="font-weight-bold">Total</h6>
                    </td>
                    <td className="align-middle">
                      <h6 className="font-weight-bold">{this.props.totalPrice}</h6>
                    </td>
                    <td className="align-middle">
                      <h6 className="font-weight-bold">{this.props.totalQuantity}</h6>
                    </td>
                    <td className="align-middle">
                      <Button className="indigo darken-3" onClick={this.finalizeOrder}>
                        Proceed
                      </Button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="4">
                      <h5 className="my-3 pl-2">No Items in Cart</h5>
                    </td>
                  </tr>
                )}
              </TableBody>
            </Table>

            {this.state.processOrder === true && this.props.cart.length !== 0 ? (
              <Card className="p-3">
                <form
                  onSubmit={this.props.handleSubmit}
                  data-orderquantity={this.props.totalQuantity}
                  data-orderprice={this.props.totalPrice}
                  data-name={this.state.name}
                  data-address={this.state.address}
                  data-phone={this.state.phone}
                >
                  <h5 className="my-4">Add Your Details</h5>
                  <label htmlFor="name" className="grey-text">
                    Name
                  </label>
                  <input type="text" onChange={this.handleName} value={this.state.name} name="userName" className="form-control" />
                  <br />
                  <label htmlFor="address" id="userAddress" className="grey-text">
                    Address
                  </label>
                  <input type="text" onChange={this.handleAddress} value={this.state.address} name="userAddress" className="form-control" />
                  <br />
                  <label htmlFor="userPhone" className="grey-text">
                    Phone
                  </label>
                  <input type="text" onChange={this.handlePhone} value={this.state.phone} name="userName" className="form-control" />
                  <Button type="submit" className="indigo darken-3 mt-4">
                    Submit Order
                  </Button>
                </form>
              </Card>
            ) : null}
          </CardBody>
        </Card> */}

        <div className="cart-billing-button">
          <button onClick={()=> this.props.history.push("/checkout")} className="cart-confirm-btn">Checkout</button>
        </div>
      </Container>
    );
  }
}

export default Cart;
