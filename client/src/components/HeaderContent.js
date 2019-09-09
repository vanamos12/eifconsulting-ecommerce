import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Role} from '../data'

class HeaderContent extends Component{
    render(){
        const {frontEndUser} = this.props.value
		const {role} = frontEndUser;
		let utilisateur = false
		let administrateur = false
		let superadminitrateur = false
		if (role === Role.Utilisateur){
			utilisateur = true
		}else if (role===Role.Administrateur){
			utilisateur = true 
			administrateur = true
		}else if (role === Role.SuperAdministrateur){
			utilisateur = true 
			administrateur = true 
			superadminitrateur = true
		}
        return (
            <div className="header-content">
                <ul className="header-content-list">
                    {
                        utilisateur ?
                        <React.Fragment>
                            <li className=""><Link to="/administrationfrontend">Plans achet&eacute;s</Link></li>
                            <li className=""><Link to="/sellplans">Vendre les plans</Link></li>
                            
                        </React.Fragment>
                        :
                        null
                    }
                    {
                        administrateur ?
                        <React.Fragment>
                            <li className=""><Link to="/validateplans">Valider les plans</Link></li>
                        </React.Fragment>
                        :
                        null
                    }
                    {
                        superadminitrateur ?
                        <React.Fragment>
                            <li className=""><Link to="/validateadmin">Valider les admins</Link></li>
                        </React.Fragment>
                        :
                        null
                    }
                </ul>
            </div>
        )
    }
}
export default HeaderContent