import React, {Component} from 'react'
import CartColumns from './CartColumns'
import CartList from './CartList'
import CartTotals from './CartTotals'
import EmptyCart from './EmptyCart'
import {ApplicationConsumer} from '../../context'

class Cart extends Component{
    render(){
        return (
            <div id="cart">
            <ApplicationConsumer>
                {value=>{
                    const {cart} = value
                    if (cart.length>0){
                        return (
                            <React.Fragment>
                                {/*<div className="spaceToSee"></div>*/}
                                <div className="cart_info">
                                    <div className="container">
                                        <h1 className="text-center">Panier</h1>
                                        <CartColumns/>
                                        <CartList value={value}/>
                                        <CartTotals 
                                            value={value} 
                                            history={this.props.history}/>
                                    </div> 
                                </div>
                              
                            </React.Fragment>
                        )
                    }
                    else{
                        return (
                            <React.Fragment>
                                {/*<div className="spaceToSee">

                                </div>*/}
                                <EmptyCart/> 
                            </React.Fragment>
                        )
                    }
                }}
            </ApplicationConsumer>
            </div>
        )
    }
}

export default Cart