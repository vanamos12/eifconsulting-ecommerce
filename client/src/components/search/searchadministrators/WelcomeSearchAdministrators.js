import React, {Component} from 'react'
import AdministrationBackEnd from '../../backend/AdministrationBackEnd'

class WelcomeSearchAdministrators extends Component{
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
        fetch('/api/searchadministratorsplans', {
            method:'POST',
            body:JSON.stringify({email:this.state.email}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.status === 200){
                
                this.props.value.setSearchAdministratorsPlans(data.plans)
                this.setState({
                    uploading:false
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
                    <div className="container text-center">
                    <h1>Rechercher un plan!</h1>
                    
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Entrez l'email du soumetteur du plan"
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
        
                <AdministrationBackEnd type="search"/>
            </div>
        )
    }
}

export default WelcomeSearchAdministrators