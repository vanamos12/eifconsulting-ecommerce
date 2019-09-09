import React, {Component} from 'react'
import EmptyValidatedPlans from './EmptyValidatedPlans'
import ValidatedPlansColumns from './ValidatedPlansColumns'
import ValidatedPlansList from './ValidatedPlansList'

class AdministrationValidatedPlans extends Component{
    render(){
        const tabPlansValidated = this.props.value.frontEndUser.tabPlansValidated
        const value = this.props.value
        if (tabPlansValidated.length === 0){
            return (
                <React.Fragment>
                    <div id="cart">
                        {/*<div className="spaceToSee">

                        </div>*/}
                        <EmptyValidatedPlans/>
                    </div>
                </React.Fragment>
                )
        }else{
            return (
                <React.Fragment>
                    <div id="cart">
                    {/*<div className="spaceToSee">

                    </div>*/}
                    
                    <div className="cart_info">
                        <div className="container">
                            <h1 className="text-center">Liste des plans valid&eacute;s</h1>
                            <ValidatedPlansColumns/>
                            <ValidatedPlansList value={value}/>
                            
                        </div> 
                    </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default AdministrationValidatedPlans