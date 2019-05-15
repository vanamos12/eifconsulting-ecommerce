import React, {Component} from 'react'
import CartItem from './CartItem'

class CartList extends Component{
    render(){
        const {cart} = this.props.value
        const value = this.props.value
        return (
            <React.Fragment>
                <div className="row cart_items_row">
                    {cart.map(item=>{
                        return <CartItem key={item.id} item={item} value={value}/>
                    })}
                </div>
                
            </React.Fragment>
        )
    }
}
export default CartList