// Login.jsx
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class LoginFrontEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      loading:false,
      password: '',
      message: '',
      params:{}
    };
  }
  componentDidMount(){
    const {match:{params}} = this.props 
    this.setState({params:params})
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading:true,
      message:''
    })
    let action=''
    fetch('/api/authenticateFrontEnd', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        action='connected'
        /*
        let history = this.props.history
        let destination = this.state.params.destination
        this.props.value.setActiveFrontEndUser(this.state.email, history, destination)*/
      } else {
        const error = new Error(res.error);
        //throw error;
        action='notconnected'
      }
      return res.json()
    })
    .then(data => {
      if (action !== 'connected'){
        this.setState({
          message:data.error,
          loading:false
        })
      }else{
        console.log(data.role)
        console.log(data.email)
        console.log(data.tabIdPlans)
        console.log("validated", data.tabPlansValidated)
        console.log("Not validated", data.tabPlansNotValidated)
        console.log("Sold", data.tabPlansSold)

        let history = this.props.history
        let destination = this.state.params.destination
        this.props.value.setActiveFrontEndUser(data, history, destination)
        
      }
    })
    .catch(err => {
      console.error(err);
      //alert('Error logging in please try again');
    });
  }
  render() {
    return (
      <div className="login">
        {/* <div className="spaceToSee"></div> */}
        <div className="container form-container text-center">
        <h1>Connectez-vous!</h1>
        <small><Link to="/signupfrontend">Inscrivez-vous ici</Link></small>
        <span>&nbsp;&nbsp;</span>
        <small><Link to="/sendpasswordmodificationtoken">Mot de passe oubli&eacute;</Link></small>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <input
            className="form-control rounded-1"
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
            className="form-control rounded-1"
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          /><br />
          </div>
        
          <div className="text-danger">{this.state.message}</div>
          {
            this.state.loading ? 
            <img 
              width="75px" 
              height="75px" 
              src="images/gif/giphyhourglass.gif" 
              alt="Chargement"/> 
            : 
            null
          }
        <input className="btn btn-primary" type="submit" value="Se connnecter"/>
        
        </form>
        </div>
      </div>
    );
  }
}