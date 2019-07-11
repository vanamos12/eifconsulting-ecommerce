import React, {Component} from 'react'

class SendMail extends Component{
    state={
        email:'',
        name:'',
        message_success:'',
        message_failure:'',
        loading:false
    }
    handleChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }
    onSubmit = (event)=>{
        event.preventDefault()
        this.setState({
            loading:true
        })

        let message_text = ""
        message_text += `Bonjour,\n`
        message_text += `Une personne vous a contacté sur le site eif-consulting\n`
        message_text += `Nom: ${this.state.name}\n`
        message_text += `Email: ${this.state.email}\n`
        message_text += `Message:\n`
        message_text += `=========================\n`
        message_text += `${this.state.message}\n`
        message_text += `=========================\n`
        message_text += `Bonne journée\n`

        let message_html = ""
        message_html += `Bonjour,<br/>`
        message_html += `Une personne vous a contacté sur le site eif-consulting<br/>`
        message_html += `Nom: ${this.state.name}<br/>`
        message_html += `Email: ${this.state.email}<br/>`
        message_html += `Message: <br/>`
        message_html += `=========================<br/>`
        message_html += `${this.state.message}<br/>`
        message_html += `=========================<br/>`
        message_html += `Bonne journée<br/>`

        let action = 'failure'
        fetch('/api/sendmail', {
            method:'POST',
            body:JSON.stringify({mail: this.state.email, message_html:message_html, message_text:message_text}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            if (res.status === 200){
                action='success'
            }else{
                action='failure'
            }
            return res.json()
        })
        .then(data=>{
            if (action === 'success'){
                this.setState({
                    message_success:"Votre message a été pris en compte.",
                    message_failure:'',
                    loading:false
                })
            }else{
                this.setState({
                    message_failure:"Erreur, veuillez reéssayer.",
                    message_success:"",
                    loading:false
                })
            }
        })
    }
    render(){
        return (
            <React.Fragment>
                <div className="spaceToSee">

                </div>
                <div className="container text-center">
                    <h1>Formulaire de Contact</h1>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label for="name">Votre nom :&nbsp;  
                                <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="email">Votre email :&nbsp;  
                                <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="message">Votre message :&nbsp; 
                                <textarea  rows="3" cols="100" id="message" name="message" value={this.state.message} onChange={this.handleChange} required/>
                            </label>
                        </div>
                        <h3 className="text-primary">{this.state.message_success}</h3>
                        <h3 className="text-danger">{this.state.message_failure}</h3>
                        {this.state.loading ? <img width="75px" height="75px" src="images/gif/giphyhourglass.gif" alt="loading"/> : null }
                        <div className="form-group">
                            <input type="submit" value="Envoyer" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default SendMail