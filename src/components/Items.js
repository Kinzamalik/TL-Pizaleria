import React, { Component } from "react";
import { Button, Card, CardBody, CardImage, CardTitle, Fa } from "mdbreact";
class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      apiUrl: [],
    };
  }

  componentDidMount() {
    var items = this.props.items;
    if(this.props.match.params.category){
      var filteredProducts = items.filter((product)=>product.itemCategory == this.props.match.params.category)
      this.setState({ items : filteredProducts})
    }else{
      this.setState({ items })
    }
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({ apiUrl: nextProps.apiUrl }, () =>
    //   fetch(this.state.apiUrl)
    //     .then(response => response.json())
    //     .then(items => this.setState({ items })),
    // );
  }

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          {this.state.items.map((item, index) => (
            <div className="col-md-4 mt-4" key={index}>
              <div className="card-item">
                <div className="img-container">
                  <img src={require(`../images/${item.itemImg}.jpg`)} className="card-item-img" alt="" />
                  <div className="card-item-cont">
                    <div className="card-item-name-cont">
                      <h4 className="card-item-name">{item.itemName}</h4>
                      <h4 className="card-item-price">€ {item.itemPrice}</h4>
                    </div>
                    <button data-name={item.itemName} data-price={item.itemPrice} onClick={()=>this.props.handleAddToCart(item.itemName,item.itemPrice,item.itemImg)} className="add-to-cart">
                      <Fa icon="plus text-white"></Fa>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Items;
