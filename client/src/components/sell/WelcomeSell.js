import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class WelcomeSell extends Component{
    render(){
        return (
            <div className="container mt-5">
                <div className="spaceToSee"></div>
                <div className="dashbord-sell">
                    <div className="dashboard-sell-left text-center">
                        <h2>Informations sur plans</h2>
                        <ul className="dashboard-sell-left-liste">
                            <li>Mes plans(5)</li>
                            <li>Plans non validés(4)</li>
                            <li>Plans Vendus</li>
                            <li>R&eacute;mun&eacute;ration</li>
                        </ul>
                    </div>
                    <div className="dashboard-sell-right text-center">
                        <h2>Soumettre les plans</h2>
                        <ul className="dashboard-sell-right-liste">
                            <li><Link to="addplandistribution">Plans de distribution</Link></li>
                            <li><Link to="addplan3d">Plans 3D</Link></li>
                            <li><Link to="addplandevis">D&eacute;vis</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default WelcomeSell