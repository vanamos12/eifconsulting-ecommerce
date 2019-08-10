import React, {Component} from 'react'

class ModifyPassword extends Component{
    state = {
        passwordResetToken:'',
        password:'',
        retypePassword:'',
        loading:false
    }
    componentDidMount(){
        const {match:{params:{passwordResetToken}}} = this.props 
        this.setState({passwordResetToken:passwordResetToken})
    }
    handleInputChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }
    onSubmit = (event)=>{
        event.preventDefault();
        console.log(this.state.passwordResetToken)
        this.setState({
            loading:true
        })
        if (this.state.password !== this.state.retypePassword){
            this.setState({
                message:'Vos mots de passe ne sont pas identiques.',
                loading:false
            })
        }else{
            fetch('/api/modify-password-node', {
                method:"POST",
                body:JSON.stringify({
                    passwordResetToken:this.state.passwordResetToken,
                    password:this.state.password
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    message:data.message,
                    loading:false
                })
            })
            .catch(err=>console.log(err))
        }
        
    }
    render(){
        return (
            <div className="modify-password">
                <div className="spaceToSee"></div>
                <div className="container form-container text-center">
                <h1>Modifier votre mot de passe!</h1>
                <form onSubmit={this.onSubmit}>
                
                
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
        )
    }
}

export default ModifyPassword