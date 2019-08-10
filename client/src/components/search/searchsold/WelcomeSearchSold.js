import React, {Component} from 'react'
import SoldPlans from '../../sell/SoldPlans';

class WelcomeSearchSold extends Component{
    state = {
        email:'',
        message:'',
        uploading:false
    }
    handleInputChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }
    onSubmit = (event)=>{
        event.preventDefault()
        this.setState({
            uploading:true
        })
        fetch('/api/searchsoldplans', {
            method:'POST',
            body:JSON.stringify({email:this.state.email}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.status === 200){
                
                this.props.value.setSearchSoldPlans(data.solds)
                this.setState({
                    uploading:false,
                    message:data.message
                })
            }else{
                this.setState({
                    uploading:false,
                    message:data.message
                })
            }
        })
        .catch(err=>console.log(err))

    }
    render(){
        return (
            <div>
                <div className="spaceToSee"></div>
                <div>    
                    <div className="container form-container text-center">
                    <h1>Rechercher le gain d'un client!</h1>
                    
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Entrez l'email du client"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                    />
                    </div>
                    
                    {
                        this.state.uploading ? 
                        <img 
                            width="75px" 
                            height="75px" 
                            src="images/gif/giphyhourglass.gif" 
                            alt="Chargement"/>
                        : 
                        null
                    }
                    <div className="text-danger">{this.state.message}</div>
                    <input className="btn btn-primary" type="submit" value="Rechercher"/>
                    
                    </form>
                    </div>
                </div>     
        
                <SoldPlans type="search" value={this.props.value}/>
            </div>
        )
    }
}

export default WelcomeSearchSold