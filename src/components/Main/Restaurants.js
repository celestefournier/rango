import React, { Component } from 'react';
import axios from 'axios';
import './Restaurants.css';
import noImage from '../../assets/noimage.png';

import Card from '../Card/Card';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      restaurants: {},
      coords: {},
    };
    this.baseURL = props.baseURL;
  }

  // Component Mount

  componentDidMount() {
    if (!sessionStorage.getItem("token")) {
      return this.props.history.push('/login');
    }
    if (!sessionStorage.getItem("data")) {
      return this.props.history.push('/categorias');
    }

    let data = JSON.parse(sessionStorage.getItem("data"));
    this.setState({coords: data.coords});
    this.setState({categories: data.cuisines});

    this.getRestaurants(data.coords, data.cuisines);
  }

  getRestaurants(coords, cuisines) {
    
    const params = { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } };
    var data = {};

    cuisines.forEach((item, i) => {
      axios.get(this.baseURL+'/restaurant?lat='+coords.lat+'&lng='+coords.lng+'&cuisines='+item.id, params)
        .then(res => {
          if (res.data) {
            data[item.name] = res.data;
          }
          if (i === cuisines.length-1) {
            this.setState({restaurants: data});
          }
        })
        .catch(err => {});
    });
  }

  // Render

  renderRestaurants() {
    var dom = [];
    var restaurants = this.state.restaurants;

    if (Object.keys(restaurants).length > 0) {
      for (var res in restaurants) {
        dom.push(<h2 key={res}>{res}</h2>);
        restaurants[res].forEach(ite => {
          if (!ite.imageUrl) {
            ite.imageUrl = noImage;
          }
          if (ite.rating === 0) {
            ite.rating = "n/a"
          }
          dom.push(
            <Card
              href={ite.url}
              target="_blank"
              name={ite.name}
              key={ite.id}
              rating={ite.rating}
              category={ite.cuisines}
              image={ite.imageUrl}
            />
          );
        });
      }
    } else {
      dom.push(<h2 key="0">Carregando...</h2>);
    }
    
    return dom;
  }

  render() {
    return (
      <div className="restaurants">
        {this.renderRestaurants()}
      </div>
    );
  }
}

export default Filter;