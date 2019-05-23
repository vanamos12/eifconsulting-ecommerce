// Login.jsx
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class LoginFrontEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      message: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }
  render() {
    return (
      <div className="login">
        <div className="spaceToSee"></div>
        <div className="container text-center">
        <h1>Connectez-vous!</h1>
        <small><Link to="/signupfrontend">Incrivez-vous ici</Link></small>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          </div>
          <div className="form-group">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          /><br />
          </div>
        <input className="btn btn-primary" type="submit" value="Se connnecter"/>
        <div className="text-danger">{this.state.message}</div>
        </form>
        </div>
      </div>
    );
  }
}