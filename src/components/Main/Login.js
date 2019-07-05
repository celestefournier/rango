import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button/Button';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      wrognPasswd: {display: 'none'}
    };
    this.baseURL = props.baseURL;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let ev = event.target;

    if (ev.name === "username") {
      this.setState({username: ev.value});
    }
    if (ev.name === "password") {
      this.setState({password: ev.value});
    }
  }

  handleSubmit(event) {
    const data = {
      grant_type: "password",
      username: this.state.username,
      password: this.state.password
    };
    const parameters = {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };

    axios.post(this.baseURL + "/token", data, parameters)
      .then(res => {
        if (res.data.access_token) {
          sessionStorage.setItem("token", res.data.access_token);
          this.props.history.push('/categorias');
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) {
            this.setState({wrognPasswd: {display: 'block'}})
          } else {
            console.log("Erro desconhecido");
          }
        } else if (err.request) {
          console.log("Não consegue se conectar com o servidor");
        } else {
          console.log('Error', err.message);
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="fields">
            <label htmlFor="username">Usuário:</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange}
              placeholder="usuario123"/>
            <label htmlFor="password">Senha:</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}
              placeholder="•••••"/>
          </div>
          <span className="wrognPasswd" style={this.state.wrognPasswd}>Usuário e/ou senha incorretos</span>
          <Button type="submit" value="Entrar"/>
        </form>
      </div>
    );
  }
}

export default Login;