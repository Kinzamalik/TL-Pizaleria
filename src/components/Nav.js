import React, { Component } from 'react';
import { Navbar, NavItem, NavLink, NavbarNav, NavbarToggler, Collapse, Fa } from 'mdbreact';
// import logo from '../images/logo.svg';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      totalQuantity: 0,
      searchActive: false,
      geolocation: ""
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount(){
    this.getLocation()
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  getLocation = () => {
    var e = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var request = new XMLHttpRequest();
        var method = 'GET';
        var url = `https://us1.locationiq.com/v1/reverse.php?key=pk.15d3efe47f6086868ed4e2aa395184d8&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
        var async = true;
        request.open(method, url, async);
        request.onreadystatechange = function () {
          if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            e.setState({geolocation: data.display_name})
            console.log(data)
          }
        };
        request.send();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  render() {
    return (
      <div>
      <Navbar className="sticky-top-nav" style={{background:'#2D2D2D !important'}} color="black darken-3" dark expand="md">
        <div className="container">
          <NavLink className="logo d-flex " to="/">
            <Fa icon="chevron-left text-white"></Fa>
          </NavLink>

            <h2 className="text-center" style={{fontSize:"16px",width:"200px",color:"#fff",display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column"}}>{this.props.titleText} <br /> <span style={{fontSize:"8px"}}>{this.state.geolocation}</span> </h2>
          <NavbarNav right className="mx-4">
              <NavItem>
                <NavLink to="/cart">
                  <Fa icon="shopping-cart" style={{ fontSize: "20px" }} />
                  <span className="text-white badge badge-light cart-badge mx-2">
                    {" "}
                    {this.props.totalQuantity}
                  </span>
                </NavLink>
              </NavItem>
            </NavbarNav>
        </div>
      </Navbar>
      {
        this.props.showSearch &&  <div className="searchbar" style={{width:this.state.searchActive ? "90%":"fit-content"}}>
        <span className="search_icon" onClick={()=>this.setState({searchActive: !this.state.searchActive})}> <Fa className="pr-2" icon="search" /></span>
          {this.state.searchActive &&  <input className="search_input" type="text" name="" placeholder="Search..." />}
      </div>
      }
     
      </div>
    );
  }
}

export default Nav;
