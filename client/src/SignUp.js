// Login.jsx
import React, { Component } from 'react';
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      message:''
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
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        //this.props.history.push('/');
        console.log(res);
        return res.json()
        
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(data =>{
      this.setState({message:data.message})
    })
    .catch(err => {
      console.error(err);
      alert('Error Sign up in please try again');
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Sign Up Below!</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
       <input type="submit" value="Submit"/>
       <span>{this.state.message}</span>
      </form>
    );
  }
}