import React, { Component } from 'react';
import axios from 'axios';
// import { Button } from 'react-bootstrap';
import Button from '../Button/Button';

import './Categories.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: {
        display: 'none'
      },
      activeCategs: [],
      categories: [],
      coordinates: {},
      buttons: {}
    };
    this.baseURL = props.baseURL;
    this.handleClick = this.handleClick.bind(this);
    this.handleClasses = this.handleClasses.bind(this);
  }

  // Comonent Mount

  componentDidMount() {
    if (!sessionStorage.getItem("token")) {
      return this.props.history.push('/login');
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        this.setState({coordinates: res.coords});
        this.getCategories(res.coords.latitude, res.coords.longitude);
      });
    }
  }

  getCategories(lat, lng) {
    const parameters = {
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem("token")
      }
    };

    axios.get(this.baseURL+'/cuisine?lat=' + lat + '&lng=' + lng, parameters)
      .then(res => {
        if (res.data) {
          this.setState({categories: res.data});
        }
      })
      .catch(err => {});
  }

  // Handles
  
  handleClick(event) {
    var item = event.target.id;
    var categories = [...this.state.activeCategs];
    var itemIndex = categories.indexOf(item);

    if (itemIndex >= 0) {
      categories.splice(itemIndex, 1);
    } else {
      categories.push(item);
    }
    this.setState({activeCategs: categories});
  }

  handleClasses(e){
    let button = this.state.buttons;
    if (button[e.target.id]) {
      button[e.target.id] = "";
      this.setState({buttons: button});
    } else {
      button[e.target.id] = "active";
      this.setState({buttons: button});
    }
  }

  categSubmit() {
    var ids = Object.keys(this.state.buttons);
    
    if (ids.length === 0) {
      return this.setState({errorMessage: {display: 'block'}});
    }

    var categories = this.state.categories;
    var cuisines = [];
    var data = {};
    data.coords = {};

    categories.map(item => {
      ids.map(id => {
        if (item.id === id) {
          cuisines.push(item);
        }
      });
    });
    
    data.cuisines = cuisines;
    data.coords.lat = this.state.coordinates.latitude;
    data.coords.lng = this.state.coordinates.longitude;

    sessionStorage.setItem("data", JSON.stringify(data));
    
    this.props.history.push('/');
  }

  // Render

  renderCategories() {
    var dom = []
    var categories = this.state.categories;
    let buttons = {};

    if (categories.length > 0) {
      categories.forEach((item, i) => {
        dom.push(<button id={item.id} key={i+1} className={this.state.buttons[item.id]} onClick={this.handleClasses}>{item.name}</button>);
      });
      dom = (<>
        <h2>Quais categorias você deseja pra hoje? :)</h2>
        <div className="categories">
          {dom}
        </div>
        <span className="errorMessage" style={this.state.errorMessage}>Selecione ao menos uma categoria!</span>
        <Button className="proximo" onClick={() => {this.categSubmit()}} value="Vamos lá!"/></>
      );
    } else {
      dom.push(<h2 key={0}>Aguardando sua localização...</h2>);
    }

    return dom;
  }

  render() {
    return (
      <div className="panel">
        {this.renderCategories()}
      </div>
    );
  }
}

export default Filter;