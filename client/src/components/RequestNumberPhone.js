import React, {Component} from 'react'
import $ from 'jquery'

class RequestNumberPhone extends Component{
    state={
        phone:'',
        email:'',
        message:''
    }
    handleInputChange = (event)=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }
    onSubmit = (event)=>{
        event.preventDefault();
        fetch('/api/mobilePayment', {
            method: 'POST',
            body: JSON.stringify({cart:this.props.value.cart}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res=>res.json())
          .then(data=>{
            const commande = data.commande
            const fields = {
                "cmd":"start",
                "rN":"testeur",
                "rt":this.state.phone,
                "rE":this.state.email,
                "rH":"EL156T672281",
            };
            var $form = $('<form>', {
                action: 'https://www.my-dohone.com/dohone/pay',
                method: 'post'
            });
            $.each(fields, function(key, val) {
                 $('<input>').attr({
                     type: "hidden",
                     name: key,
                     value: val
                 }).appendTo($form);
            });
            $form.appendTo('body').submit();
          })
          .catch(err=>{
              console.log(err);
          })
    }
    render(){
        return (
            <div className="requestNumberPhone">
                <div className="spaceToSee"></div>
                <div className="container text-center">
                <h1>Entrez votre num&eacute;ro de mobile!</h1>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <input
                    className="form-control"
                    type="number"
                    name="phone"
                    placeholder="Entrez votre num&eacute;ro de t&eacute;l&eacute;phone"
                    value={this.state.phone}
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
                <input className="btn btn-primary" type="submit" value="Soumettre"/>
                <div className="text-danger">{this.state.message}</div>
                </form>
                </div>
            </div>
        )
    }
}

export default RequestNumberPhone