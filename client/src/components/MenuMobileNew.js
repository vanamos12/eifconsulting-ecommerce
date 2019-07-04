import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class MenuMobileNew extends Component{
    render(){
        const {frontEndUser, deconnexion} = this.props.value;
        return (
            <div className="menu-wrap">
                <input type="checkbox" className="toggler"/>
                <div className="hamburger-mobile"><div></div></div>
                <div className="menu-mobile">
                    <div>
                        <div>
                            <ul>
                                <li><Link to='/'>Accueil</Link></li>
                                <li><a href="#">Plans</a></li>
                                <li><a href="#">&Agrave; propos de nous</a></li>
                                <li><a href="#">Contact</a></li>
                                {
								    frontEndUser.connected ? 
									<li><Link to='/administrationfrontend'>Administration</Link></li>
									:
									<React.Fragment></React.Fragment>
							    }
                                <li>
                                    {
                                        frontEndUser.connected ? 
                                        <span 
                                            
                                            onClick={()=>{
                                                deconnexion()
                                            }}>
                                                D&eacute;connexion</span>:
                                        <Link to="/loginfrontend/home">Connexion</Link> 
								    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuMobileNew