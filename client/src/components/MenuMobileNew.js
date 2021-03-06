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
                                <li><a href="http://eifconsulting.cm/apropos.php" target="_blank">&Agrave; propos de nous</a></li>
                                <li><a href="#">Contact</a></li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuMobileNew