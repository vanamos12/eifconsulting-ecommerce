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
                        
                        let allPlans = value.backEndUser.allPlans
                        if (this.props.type === "search"){
                            allPlans = value.search.resultsAdministrators
                        }
                        if (allPlans.length === 0){
                            return (
                                <React.Fragment>
                                    <div id="cart">
                                        {this.props.type==="search"? null:
                                        <div className="spaceToSee">
                
                                        </div>
                                        }
                                        <EmptyBackEnd/>
                                    </div>
                                </React.Fragment>
                                )
                        }else{
                            return (
                                <React.Fragment>
                                    <div id="cart">
                                    {this.props.type==="search"? null:
                                        <div className="spaceToSee">
                
                                        </div>
                                        }
                                    
                                    <div className="cart_info">
                                        <div className="container text-center">
                                            <h1>Liste de tous les plans.</h1>
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