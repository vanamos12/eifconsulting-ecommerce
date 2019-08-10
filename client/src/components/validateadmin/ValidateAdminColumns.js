import React, {Component} from 'react'

class ValidateAdminColumns extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                         {/*Column Titles*/} 
                        <div className="cart_info_columns clearfix">
                            <div className="cart_info_col cart_info_col_product">Nom</div>
                            <div className="cart_info_col cart_info_col_price">Email</div>
                            <div className="cart_info_col cart_info_col_quantity">Téléphone</div>
                            <div className="cart_info_col cart_info_col_total">Actions</div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ValidateAdminColumns