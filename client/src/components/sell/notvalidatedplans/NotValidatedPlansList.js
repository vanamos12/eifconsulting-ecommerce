import React, {Component} from 'react'
import NotValidatedPlansItem from './NotValidatedPlansItem'

class NotValidatedPlansList extends Component{
    render(){
        const tabPlansNotValidated = this.props.value.frontEndUser.tabPlansNotValidated
        const value = this.props.value
        return (
            <React.Fragment>
                <div className="row cart_items_row">
                    {tabPlansNotValidated.map(item=>{
                        return <NotValidatedPlansItem key={item._id} item={item} value={value}/>
                    })}
                </div>
            </React.Fragment>
        ) 
    }
}

export default NotValidatedPlansList