import React, {Component} from 'react'
import EmptyBackEnd from './EmptyBackEnd'
import BackEndList from './BackEndList'
import BackEndColumns from './BackEndColumns'
import {ApplicationConsumer} from '../../context'
import {Link} from 'react-router-dom'

class AdministrationBackEnd extends Component{
    render(){
        return (
            <React.Fragment>
                <ApplicationConsumer>
                    {(value)=>{
                        const allPlans = value.backEndUser.allPlans
                        if (allPlans.length === 0){
                            return (
                                <React.Fragment>
                                    <div id="cart">
                                        <div className="spaceToSee">
                
                                        </div>
                                        <EmptyBackEnd/>
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
                                            <Link to='addplan'>Ajouter un plan</Link>
                                            <BackEndColumns/>
                                            <BackEndList value={value}/>
                                            
                                        </div> 
                                    </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    }}
                </ApplicationConsumer>
            </React.Fragment>
        )
    }
}

export default AdministrationBackEnd