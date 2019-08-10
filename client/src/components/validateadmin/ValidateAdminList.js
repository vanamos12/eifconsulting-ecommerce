import React, {Component} from 'react'
import ValidateAdminItem from './ValidateAdminItem'

class ValidateAdminList extends Component{
    render(){
        const value = this.props.value
        const administrators = value.administrators
        
        return (
            <React.Fragment>
                <div className="row cart_items_row">
                    {administrators.map(item=>{
                        return <ValidateAdminItem key={item._id} item={item} value={value}/>
                    })}
                </div>
            </React.Fragment>
        ) 
    }
}

export default ValidateAdminList