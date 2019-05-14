import React, {Component} from 'react'
import Plan from './Plan'
import {ApplicationConsumer} from '../context'

class PlanList extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                
                                <div className="product_grid2">
                                <ApplicationConsumer>
                                    {value=>{
                                        return value.plansCoupCoeur.map(plan => {
                                            return <Plan key={plan._id} plan={plan}/>
                                        })
                                    }}
                                </ApplicationConsumer>
                                                
            
                                </div>
                                    
                            </div>
                        </div>
                    </div>
		        </div>
            </React.Fragment>
        )
    }
}

export default PlanList