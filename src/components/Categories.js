import React, { Component } from 'react';
import { Button, Card, CardBody, CardImage, CardTitle, Fa } from 'mdbreact';
import './Items.css';
import { Link } from 'react-router-dom';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { id: 1, categoryName: "Rolls and Wraps", categoryPug: "bbq-roll", categoryImg: "BBQ-roll-original" },
        { id: 2, categoryName: "Muffins", categoryPug: "muffins", categoryImg: "muffins-original" },
      ],
      apiUrl: [],
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          {this.state.categories.map((item, index) => (
            <Link to={`/items/${item.categoryPug}`} className="col-md-4 mt-4" key={index}>
              <div className="card-cont">
                <div className="img-container">
                  <img src={require(`../images/${item.categoryImg}.jpg`)} className="card-img" alt="" />
                  <div className="card-category-cont">
                    <h4 className="card-cat-name">{item.categoryName}</h4>
                    <Fa icon="chevron-right text-white"></Fa>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Categories;
