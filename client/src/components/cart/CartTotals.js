import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PaypalButton from '../PaypalButton'

class CartTotals extends Component{
    mobile_payment = ()=>{
        console.log("mobile payments");
    }
    render(){
        const {cartSubTotal, cartTax, cartTotal, clearCart, processPayment, savePayments} = this.props.value
        const isConnectedFrontEndUser = this.props.value.frontEndUser.connected
        const history = this.props.history
        return (
            <React.Fragment>
                <div className="row row_cart_buttons">
                    <div className="col">
                        <div className="cart_buttons d-flex flex-lg-row flex-column align-items-start justify-content-start">
                            <div className="button continue_shopping_button"><a href="/">Retourner aux achats</a></div>
                            <div className="cart_buttons_right ml-lg-auto">
                                <div 
                                    className="button clear_cart_button"
                                    onClick={()=>{
                                        clearCart();
                                    }}><a href="/">Clear cart</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row_extra">

                    <div className="col-lg-6 offset-lg-2">
                        <div className="cart_total">
                            <div className="section_title">Cart total</div>
                            <div className="section_subtitle">Final info</div>
                            <div className="cart_total_container">
                                <ul>
                                    <li className="d-flex flex-row align-items-center justify-content-start">
                                        <div className="cart_total_title">Total</div>
                                        <div className="cart_total_value ml-auto"> {cartTotal} FCFA</div>
                                    </li>
                                </ul>
                            </div>
                            {
                                isConnectedFrontEndUser ?
                                 <div className="d-flex">
                                    <PaypalButton clearCart={clearCart} history={history} savePayments={savePayments}/> 
                                    <div className="cursorPointer" onClick={this.mobile_payment}>
                                        <img width="150px" height="75px"src="images/logo/logo_orange_mtn_money.png" alt="mobile payment"/>
                                    </div>
                                 </div>
                                 :
                                <div 
                                    className="button checkout_button"
                                    onClick={()=>{
                                        processPayment(history, cartTotal)
                                    }}>
                                        <a href="#">Payer</a>
                                </div> 
                            }
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default CartTotals