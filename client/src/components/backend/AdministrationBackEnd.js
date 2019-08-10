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
                        console.log("first phase")
                        if (this.props.type === "search"){
                            console.log("second phase")
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
                                        <EmptyBackEnd type={this.props.type} />
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
                                            {
                                                this.props.type === "search" ?
                                                <h1>R&eacute;sultats de la recherche.</h1>
                                                :
                                                <h1>Liste de tous les plans.</h1>
                                            }
                                            
                                            <BackEndColumns/>
                                            <BackEndList value={value} type={this.props.type} />
                                            
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