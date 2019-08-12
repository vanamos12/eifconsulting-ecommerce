import React, {Component} from 'react'

class ValidateAdminItem extends Component{
    render(){
        const {_id, name, email, surname, telephone, isAdminActive} = this.props.item
        const value = this.props.value
        return (
            <React.Fragment>
                <div className="col">

                                        
                    <div className="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start">
                        
                        <div className="cart_item_product d-flex flex-row align-items-center justify-content-start">
                            
                            <div className="cart_item_name_container">
                                <div className="cart_item_name"><a href="#">{ name+' '+surname }</a></div>
                            </div>
                        </div>
                        
                        <div className="cart_item_price">{ email }</div>
                        
                        <div className="cart_item_quantity">
                            {telephone}
                        </div>
                        <div className="cart_item_total">
                            {
                                isAdminActive
                                ?
                                <span onClick={()=>{value.setAdminValidate(_id, false)}}>D&eacute;j&agrave; valid&eacute;</span>
                                :
                                <span onClick={()=>{value.setAdminValidate(_id, true)}}>Valider</span>
                            }
                        </div>
                        {/*<div className="cart_item_quantity">
                            <div className="product_quantity_container">
                                <div className="product_quantity clearfix">
                                    <span>Qty</span>
                                    <input id="quantity_input" type="text" pattern="[0-9]*" value={count}/>
                                    <div className="quantity_buttons">
                                        <div 
                                            id="quantity_inc_button" 
                                            className="quantity_inc quantity_control"
                                            onClick={()=>{
                                                increment(_id)
                                            }}><i className="fa fa-chevron-up" aria-hidden="true"></i></div>
                                        <div 
                                            id="quantity_dec_button" 
                                            className="quantity_dec quantity_control"
                                            onClick={()=>{
                                                decrement(_id)
                                            }}><i className="fa fa-chevron-down" aria-hidden="true"></i></div>
                                    </div>
                                </div>
                            </div>
                                        </div>
                        
                        <div className="cart_item_total">{total} FCFA</div>*/}
                    </div>

                    </div>
            </React.Fragment>
        )
    }
}

export default ValidateAdminItem