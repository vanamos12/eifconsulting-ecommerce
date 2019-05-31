import React, {Component} from 'react'
import BackEndItem from './BackEndItem'

class BackEndList extends Component{
    render(){
        const {allPlans} = this.props.value.backEndUser
        const value = this.props.value
        return (
            <React.Fragment>
                <div className="row cart_items_row">
                    {allPlans.map(item=>{
                        return <BackEndItem key={item._id} item={item} value={value}/>
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default BackEndList