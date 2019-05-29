import React, {Component} from 'react'
import FrontEndItem from './FrontEndItem'

class FrontEndList extends Component{
    render(){
        const {tabIdPlans} = this.props.value.frontEndUser
        const value = this.props.value
        return (
            <React.Fragment>
                <div className="row cart_items_row">
                    {tabIdPlans.map(item=>{
                        return <FrontEndItem key={item._id} item={item} value={value}/>
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default FrontEndList