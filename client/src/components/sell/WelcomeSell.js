import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeSell extends Component{
    render(){
        const countvalidatedplans = this.props.value.frontEndUser.tabPlansValidated.length
        const countnotvalidatedplans = this.props.value.frontEndUser.tabPlansNotValidated.length
        const countNbPlansSold = this.props.value.frontEndUser.tabPlansSold.length
        return (
            <div className="container mt-5">
                <div className="spaceToSee"></div>
                <div className="dashbord-sell">
                    <div className="dashboard-sell-left text-center">
                        <h2>Informations sur plans</h2>
                        <ul className="dashboard-sell-left-liste">
                            <li><Link to="/validatedplans">Mes plans({countvalidatedplans})</Link></li>
                            <li><Link to="/notvalidatedplans">Plans non validés({countnotvalidatedplans})</Link></li>
                            <li><Link to="/soldplans">Plans Vendus({countNbPlansSold})</Link></li>
                        </ul>
                    </div>
                    <div className="dashboard-sell-right text-center">
                        <h2>Soumettre les plans</h2>
                        <ul className="dashboard-sell-right-liste">
                            <li><Link to="/addplandistribution">Plans de distribution</Link></li>
                            <li><Link to="/addplan3d">Plans 3D</Link></li>
                            <li><Link to="/addplandevis">D&eacute;vis</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default WelcomeSell