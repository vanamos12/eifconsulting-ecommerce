import React, {Component} from 'react'


class Plan extends Component{
    render(){
        const {name, price, image} = this.props.plan
        return (
            <div className="product">
                <div className="product_image"><img src={image} alt=""/></div>
                <div className="product_content">
                    <div className="product_title"><a href="product.html">{name}</a></div>
                    <div className="product_price">{price} FCFA</div>
                    <div className="btn btn-primary mt-1">Acheter</div>
                </div>
            </div>
        )
    }
}

export default Plan