import React, {Component} from 'react'
import {ApplicationConsumer} from '../context'
import {Link} from 'react-router-dom'


class Plan extends Component{
    render(){
        const {_id, inCart, name, price, image} = this.props.plan
        const from = this.props.from
        return (
            <ApplicationConsumer>
                    {value=>(
                        <div className="product">
                            <div className="product_image"><img style={{objectFit:"cover"}} src={image} alt=""/></div>
                            <div className="product_content">
                                <div className="product_title"
                                    onClick={()=>{
                                        value.setDetailPlan(_id)
                                    }}>
                                        <Link to="/detail">{name}</Link>
                                </div>
                                <div className="product_price">{price} FCFA</div>
                                <div className=" d-flex justify-content-between mt-1">
                                    <button 
                                        style={{
                                            width:'50%',
                                            marginLeft:'2px'
                                        }}
                                        disabled = {inCart ? true: false }
                                        onClick={()=>{
                                            value.addToCart(_id, from)
                                        }}
                                        className={inCart ? "btn btn-warning" : "btn btn-primary"}>{inCart ? "Dans panier" : "Acheter"}</button>
                                    <button 
                                        style={{
                                            width:'50%',
                                            marginLeft:'2px'
                                        }}
                                        onClick={()=>{
                                            console.log("details")
                                            value.setDetailPlan(_id)
                                        }}
                                        className="btn btn-primary"><Link to='/detail' style={{color:"white"}}>D&eacute;tails</Link></button>
                                </div>
                            </div>
                        </div>
                    )}
            </ApplicationConsumer>
        )
    }
}

export default Plan