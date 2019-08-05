import React, {Component} from 'react'

class ValidatedPlansColumns extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                         {/*Column Titles*/} 
                        <div className="cart_info_columns clearfix">
                            <div className="cart_info_col cart_info_col_product">Plan</div>
                            <div className="cart_info_col cart_info_col_price">Price</div>
                            <div className="cart_info_col cart_info_col_quantity">Actions</div>
                            {/*<div className="cart_info_col cart_info_col_total">Total</div>*/}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ValidatedPlansColumns