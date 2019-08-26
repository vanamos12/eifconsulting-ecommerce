// Login.jsx
import React, { Component } from 'react';
export default class SignUpFrontEnd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      retypePassword: '',
      message:'',
      name:'',
      surname:'',
      telephone:'',
      role:'Utilisateur',
      loading:false
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
    this.setState({
      loading:true
    })
    if (this.state.password !== this.state.retypePassword){
      this.setState({message:'Vos mots de passe ne sont pas identiques.'})
    }else{
      let action = 'notsignedup'
      fetch('/api/signupFrontEnd', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          action = 'signedup' 
          return res.json()
          
        } else {
          const error = new Error(res.error);
          //throw error;
          return res.json()
        }
      })
      .then(data =>{
        this.setState({
          message:data.message,
          loading:false
        })
        /*if (action !== 'signedup'){
          this.setState({message:data.message})
        }else{
          if (this.state.role === 'Utilisateur'){
            this.props.history.push('/loginfrontend/signup');
          }else{ // It's an administrator, we tell to him to ccntact customer service for validation
            this.setState({message:'Contactez le service client pour votre actvation en tant que administrateur.'})
          }
          
        }*/
      })
      .catch(err => {
        console.error(err);
        //alert('Error Sign up in please try again');
      });
    }
  }
  render() {
    return (
      <div className="signup">
        <div className="spaceToSee"></div>
        <div className="container form-container text-center">
        <h1>Inscrivez-vous ici!</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Entrez votre nom"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="surname"
              placeholder="Entrez votre pr&eacute;nom"
              value={this.state.surname}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              name="telephone"
              placeholder="Entrez votre t&eacute;l&eacute;phone"
              value={this.state.telephone}
              onChange={this.handleInputChange}
              required
            />
          </div>
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
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="retypePassword"
              placeholder="Retapez votre mot de passe"
              value={this.state.retypePassword}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="role"> R&ocirc;le :&nbsp;
                <select 
                  id="role" 
                  name="role"
                  value={this.state.role} 
                  onChange={this.handleInputChange} 
                  required
                >
                    <option>Utilisateur</option>
                    <option>Administrateur</option>
                </select>
            </label>
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
        <input className="btn btn-primary" type="submit" value="Soumettre"/>
        
        </form>
        </div>
      </div>
    );
  }
}