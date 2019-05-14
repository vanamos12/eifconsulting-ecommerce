import React, {Component} from 'react'
import {ApplicationConsumer} from '../context'


class Plan extends Component{
    render(){
        const {_id, inCart, name, price, image} = this.props.plan
        return (
            <ApplicationConsumer>
                    {value=>(
                        <div className="product">
                            <div className="product_image"><img src={image} alt=""/></div>
                            <div className="product_content">
                                <div className="product_title"><a href="product.html">{name}</a></div>
                                <div className="product_price">{price} FCFA</div>
                                <div className=" d-flex justify-content-between mt-1">
                                    <button 
                                        disabled = {inCart ? true: false }
                                        onClick={()=>{
                                            value.addToCart(_id)
                                        }}
                                        className={inCart ? "btn btn-warning" : "btn btn-primary"}>{inCart ? "Dans panier" : "Acheter"}</button>
                                    <button 
                                        onClick={()=>{
                                            console.log("details")
                                        }}
                                        className="btn btn-primary">D&eacute;tails</button>
                                </div>
                            </div>
                        </div>
                    )}
            </ApplicationConsumer>
        )
    }
}

export default Plan