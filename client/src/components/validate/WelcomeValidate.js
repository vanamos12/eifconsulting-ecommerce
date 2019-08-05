import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeValidate extends Component{
    componentDidMount(){
        //Search all the plans and place it in the content.
    }
    render(){
        const countvalidatedplans = this.props.value.frontEndUser.tabPlansValidated.length
        const countnotvalidatedplans = this.props.value.frontEndUser.tabPlansNotValidated.length

        return (
            <div className="container mt-5">
                <div className="spaceToSee"></div>
                <div className="dashbord-validate text-center">
                    <h2>Valider les plans</h2>
                    <ul className="dashboard-validate-liste">
                        <li><Link to="/allplans">Tous les plans(100)</Link></li>
                        <li><Link to="/searchadministrateurplans">Rechercher</Link></li>
                        <li>Gain</li>
                    </ul>
                    
                </div>

            </div>
        )
    }
}

export default WelcomeValidate