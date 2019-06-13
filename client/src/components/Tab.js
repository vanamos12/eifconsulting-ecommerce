import React, {Component} from 'react'
import {ApplicationConsumer} from '../context'
import Plan from './Plan'

class Tab extends Component{
    openCity = (event, name)=>{
        console.log('helllo from opencity');
        // Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(name).style.display = "block";
		event.currentTarget.className += " active";
    }
    render(){
        return (
            <React.Fragment>
                <div className="onglets">
                    <div className="container">
                        {/* Tab links */}
                        <div className="tab mb-4">
                            <button id="buttonLondon" className="tablinks" onClick={(event)=>this.openCity(event, 'London')}>Nouveaux plans</button>
                            <button id="buttonParis" className="tablinks" onClick={(event)=>this.openCity(event, 'Paris')}>Coup de coeur</button>
                        </div>
                        
                        
                        <div id="London" className="tabcontent">
                            <div className="product_grid2">
                                 
                                <ApplicationConsumer>
                                    {value=>{
                                        return value.plansPopular.map(plan => {
                                            return <Plan key={plan._id} plan={plan} from="popular"/>
                                        })
                                    }}
                                </ApplicationConsumer>

                            </div>
                        </div>
                        
                        <div id="Paris" className="tabcontent">
                            <div className="product_grid2">
                                <ApplicationConsumer>
                                    {value=>{
                                        return value.plansCoupCoeur.map(plan => {
                                            return <Plan key={plan._id} plan={plan} from="coeur"/>
                                        })
                                    }}
                                </ApplicationConsumer>     
            
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Tab