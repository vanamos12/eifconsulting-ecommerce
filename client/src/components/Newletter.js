import React, {Component} from 'react'

class Newletter extends Component{
    state={
        email:'',
        messagesuccess:'',
        messagefailure:''
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        let action = 'failure'
        fetch('/api/newletter', {
            method:'POST',
            body:JSON.stringify({email:this.state.email}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>{
            
            if (res.status === 200){
                action="success"
                
            }else {
                action="failure"
            }
            return res.json()
        })
        .then(data=>{
            if (action === 'success'){
                this.setState({
                    messagesuccess:'Votre email a  été pris en compte.',
                    messagefailure:''
                })
            }else{
                this.setState({
                    messagefailure:data.message,
                    messagesuccess:''
                })
            }
            console.log('finished');
        })
        .catch(err=>{
            console.log(err)
        })

    }
    handleChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    render(){
        return (
            <React.Fragment>
                <div className="newsletter">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="newsletter_border"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="newsletter_content text-center">
                                    <div className="newsletter_title">Souscrivez &agrave; notre newsletter</div>
                                    <div className="newsletter_text"><p>Vous serez inform&eacute;s de la sortie de ouveux plans.</p></div>
                                    <div className="newsletter_form_container">
                                        <form onSubmit={this.handleSubmit} id="newsletter_form" className="newsletter_form">
                                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="newsletter_input" required="required"/>
                                            <button className="newsletter_button trans_200"><span>Souscrire</span></button>
                                        </form>
                                        <h3 className="text-default">{this.state.messagesuccess}</h3>
                                        <h3 className="test-danger">{this.state.messagefailure}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Newletter