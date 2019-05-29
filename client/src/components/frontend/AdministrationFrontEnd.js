import React, {Component} from 'react'
import FrontEndColumns from './FrontEndColumns'
import FrontEndList from './FrontEndList'
import EmptyFrontEnd from './EmptyFrontEnd'
import {ApplicationConsumer} from '../../context'

class AdministrationFrontEnd extends Component{
    render(){
        return (
            <ApplicationConsumer>
                {(value)=>{
                    const tabIdPlans = value.frontEndUser.tabIdPlans
                    console.log(value.frontEndUser)
                    if (tabIdPlans.length === 0){
                        return (
                            <React.Fragment>
                                <div id="cart">
                                    <div className="spaceToSee">
            
                                    </div>
                                    <EmptyFrontEnd/>
                                </div>
                            </React.Fragment>
                            )
                    }else{
                        return (
                            <React.Fragment>
                                <div id="cart">
                                <div className="spaceToSee">
            
                                </div>
                                
                                <div className="cart_info">
                                    <div className="container">
                                        <FrontEndColumns/>
                                        <FrontEndList value={value}/>
                                        
                                    </div> 
                                </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                }}
            </ApplicationConsumer>
        )
    }
}

export default AdministrationFrontEnd