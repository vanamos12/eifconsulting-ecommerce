import React, {Component} from 'react'
import EmptyNotValidatedPlans from './EmptyNotValidatedPlans'
import NotValidatedPlansColumns from './NotValidatedPlansColumns'
import NotValidatedPlansList from './NotValidatedPlansList'

class AdministrationNotValidatedPlans extends Component{
    render(){
        const tabPlansNotValidated = this.props.value.frontEndUser.tabPlansNotValidated
        const value = this.props.value
        if (tabPlansNotValidated.length === 0){
            return (
                <React.Fragment>
                    <div id="cart">
                        {/*<div className="spaceToSee">

                        </div>*/}
                        <EmptyNotValidatedPlans/>
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
                            <h1 className="text-center">Liste des plans non valid&eacute;s</h1>
                            <NotValidatedPlansColumns/>
                            <NotValidatedPlansList value={value}/>
                            
                        </div> 
                    </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default AdministrationNotValidatedPlans