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
            body: JSON.stringify({cart:this.props.value.cart, 
                telephone:this.state.phone,
                email:this.props.value.frontEndUser.email,
                total:this.props.value.cartTotal
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res=>res.json())
          .then(data=>{
            const command = data.command
            console.log(command)
            const fields = {
                "cmd":"start",
                "rN":"testeur",
                "rT":this.state.phone,
                "rE":this.state.email,
                "rH":"EL156T672281",
                "rI":command,
                "rMt":this.props.value.cartTotal,
                "rDvs":"XAF",
                "rLocale":"fr",
                "source":"EIF Consulting E-commerce",
                "endPage":"https://eifconsulting-ecommerce.herokuapp.com/successdohone",
                "notifyPage":"https://eifconsulting-ecommerce.herokuapp.com/notifydohone",
                "cancelPage":"https://eifconsulting-ecommerce.herokuapp.com/canceldohone",
                "logo":"https://eifconsulting-ecommerce.herokuapp.com/images/logo/logo.jpg",
                "motif":"Payement d'un plan"
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
                <div className="container form-container text-center">
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