import React, {Component} from 'react'

class SendPasswordModificationToken extends Component{
    state={
        email:'',
        message:'',
        loading:false
    }
    handleInputChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    onSubmit = (event)=>{
        event.preventDefault();
        this.setState({
            loading:true
        })
        fetch('/api/send-password-modification-token', {
            method:'POST',
            body:JSON.stringify({email:this.state.email}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.status==='emailnonenregistre'){
                this.setState({
                    message:'Vous n\'avez pas de compte chez nous.',
                    loading:false
                })
            }else if (data.status==='erreurenvoiemail'){
                this.setState({
                    message:'Erreur d\'envoi de l\'email.',
                    loading:false
                })
            }else if (data.status==='okay'){
                this.setState({
                    message:'Veuillez verifier votre boîte email pour la suite.',
                    loading:false
                })
            }
        })
        .catch(err=>console.log(err))
    }
    render(){
        return (
            <div className="login">
                <div className="spaceToSee"></div>
                <div className="container text-center">
                <h1>Mettez &agrave; jour votre mot de passe!</h1>
                
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
                <input className="btn btn-primary" type="submit" value="Envoyer le lien de mise &agrave; jour"/>
                
                </form>
                </div>
            </div>
        )
    }
}
export default SendPasswordModificationToken