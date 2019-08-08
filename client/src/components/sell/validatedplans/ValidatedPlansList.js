import React, {Component} from 'react'
import ValidatedPlansItem from './ValidatedPlansItem'

class ValidatedPlansList extends Component{
    render(){
        const value = this.props.value
        const tabPlansValidated = value.frontEndUser.tabPlansValidated
        
        return (
            <React.Fragment>
                <div className="row cart_items_row">
                    {tabPlansValidated.map(item=>{
                        return <ValidatedPlansItem key={item._id} item={item} value={value}/>
                    })}
                </div>
            </React.Fragment>
        ) 
    }
}

export default ValidatedPlansList