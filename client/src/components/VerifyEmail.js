import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class VerifyEmail extends Component{
    state = {
        loading:true,
        utilisateur:''
    }
    componentDidMount(){
        const {match:{params:{emailVerificationToken}}} = this.props 
        
        fetch('/api/verify-email-node', {
            method:"POST",
            body:JSON.stringify({emailVerificationToken: emailVerificationToken}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                utilisateur:data.utilisateur,
                loading:false
            })
        })
    }
    render(){
        let bienvenue=""
        if (this.state.utilisateur === 'Utilisateur'){
            bienvenue = <div>
                <h2 className="text-uppercase">Votre compte a &eacute;t&eacute; valid&eacute;.</h2>
                <h3><Link to="/loginfrontend/firsttime">Se connecter</Link></h3>
            </div>
        }else if (this.state.utilisateur === 'Administrateur'){
            bienvenue = <div>
                <h2 className="text-uppercase">Veuillez contacter le service client pour valider votre compte administrateur.</h2>
                <h3><Link to="/">Continuer les achats.</Link></h3>
            </div>
        }else{
            bienvenue = <div>
                <h2 className="text-uppercase">Votre code d'activation est incorrect.</h2>
                <h3><Link to="/">Continuer les achats.</Link></h3>
            </div>
        }
        return (
            <div className="container mt-5">
                <div className="spaceToSee"></div>
                <div className="row">
                    <div className="col-10 mx-auto text-center">
                        {
                            this.state.loading ?
                            <img 
                                width="75px" 
                                height="75px" 
                                src="images/gif/giphyhourglass.gif" 
                                alt="Chargement"/> 
                            : 
                            bienvenue
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default VerifyEmail