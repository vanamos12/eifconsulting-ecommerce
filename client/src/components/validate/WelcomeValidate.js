import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeValidate extends Component{
    
    render(){
        const countallplans = this.props.value.backEndUser.allPlans.length
        

        return (
            <div className="container mt-5">
                <div className="spaceToSee"></div>
                <div className="dashbord-validate text-center">
                    <h2>Valider les plans</h2>
                    <ul className="dashboard-validate-liste">
                        <li><Link to="/allplans">Tous les plans({countallplans})</Link></li>
                        <li><Link to="/searchadministrateurplans">Rechercher</Link></li>
                        <li>Gain</li>
                    </ul>
                    
                </div>

            </div>
        )
    }
}

export default WelcomeValidate