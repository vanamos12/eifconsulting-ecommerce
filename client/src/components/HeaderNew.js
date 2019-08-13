import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Role} from '../data'
import MenuMobileNew from './MenuMobileNew'
import $ from 'jquery'

class HeaderNew extends Component{
	toggle = (event)=>{
		$('.connexion-menu').toggle();
	}
	close = (event)=>{
		$('.connexion-menu').hide();
	}
    render(){
		const {cartTotalNumberPlans, frontEndUser, deconnexion} = this.props.value
		const {role, email} = frontEndUser;
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
		console.log('utilisateur', utilisateur)
        return (
            <div className="header">
				<div className="compte">
					<div className="connexion-brand">
						{
							utilisateur ?
							<span 
								className="identification"
								onClick={this.toggle}><i className="fa fa-user"></i>&nbsp;{email}&nbsp;<i className="fa fa-arrow-down"></i></span>
							:
							<Link to='/loginfrontend/home'>Se connecter</Link>
						}
						
					</div>
					<div className="connexion-menu" onClick={this.close}>
						<ul>
							{
								utilisateur ?
								<React.Fragment>
									<li><Link to="/myinformations">Mes informations</Link></li>
									<li><Link to="/administrationfrontend">Plans achet&eacute;s</Link></li>
									<li><Link to="/sellplans">Vendre les plans</Link></li>
									
								</React.Fragment>
								:
								null
							}
							{
								administrateur ?
								<React.Fragment>
									<li><Link to="/validateplans">Valider les plans</Link></li>
								</React.Fragment>
								:
								null
							}
							{
								superadminitrateur ?
								<React.Fragment>
									<li><Link to="/validateadmin">Valider les admins</Link></li>
								</React.Fragment>
								:
								null
							}
							{
								utilisateur ?
								<React.Fragment>
									<li
										onClick={()=>{deconnexion()}}
									>Se d&eacute;connecter</li>
								</React.Fragment>
								:
								null
							}
							
							
						</ul>
					</div>
				</div>
				<div className="header-new">
					<div className="logo">
						<img width="125px" height="125px" src="images/logo/logo.jpg" alt="logo"/>
					</div>
					<div className="brand-wrapper">
						<div className="brand">
						Electricité-Informatique-Froid
						</div>
					</div>
					<div className="contact-info">
						
						<div className="contact">
							<div><i className="fa fa-phone"></i>+237 6 96 12 84 27</div>
							<div><i className="fa fa-envelope"></i>eifconsultingandservices@gmail.com</div>
							
						</div>
					</div>
				</div>
				<div className="menu-wrapper">
					<MenuMobileNew value={this.props.value}/>
					<div className="menu-left">
						<ul className="menu-list">
							<li><Link to="/">Accueil</Link></li>
							<li>
								<a id="buttonDropDown">Plans</a>
                                                
								<div id="myDropdown" className="dropdown-content">
									<div className="row">
										<div className="col-md-5 col-lg-5 col-sm-5 offset-md-1 offset-lg-1 offset-sm-1">
											<div>
												<h3>Styles</h3>
												<ol>
													<li><a href="#">Tous nos plans de maisons</a></li>
													<li><a href="#">Maison moderne</a></li>
													<li><a href="#">Maison contemporaine</a></li>
													<li><a href="#">Maison traditionelle</a></li>
												</ol>
											</div>
											<div>
												<h3>Formes</h3>
												<ol>
													<li><a href="#">Maison en L</a></li>
													<li><a href="#">Maison en U</a></li>
													<li><a href="#">Maison en V</a></li>
												</ol>
											</div>
											<div>
												<h3>&Eacute;tages</h3>
												<ol>
													<li><a href="#">Plain-pied</a></li>
													<li><a href="#">&Agrave; &eacute;tages</a></li>
													<li><a href="#">Avec sous-sol</a></li>
												</ol>
											</div>
										</div>
										<div className="col-md-5 col-lg-5 col-sm-5">
											<div>
												<h3>Prix</h3>
												<ol>
													<li><a href="#">Plain-pied</a></li>
													<li><a href="#">&Agrave; &eacute;tages</a></li>
													<li><a href="#">Avec sous-sol</a></li>
												</ol>
											</div>
											<div>
												<h3>Compl&eacute;ments</h3>
												<ol>
													<li><a href="#">Exemple gratuit de plan &agrave; t&eacute;l&eacute;charger</a></li>
													<li><a href="#">Les nouveaux plans de maison &agrave; t&eacute;l&eacute;charger</a></li>
													<li><a href="#">Les coups de coeurs des internautes</a></li>
													<li><a href="#">Plans en PROMO</a></li>
												</ol>
											</div>
										</div>
									</div>
								</div>
							</li>
							<li><a href="http://eifconsulting.cm/apropos.php" target="_blank">&Agrave; propos de nous</a></li>
							<li>Contact</li>
							
							
						</ul>
						
					</div>
					<div className="menu-right">
						<div className="content">
							
							<svg width="28px" height="28px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
									 viewBox="0 0 489 489" style={{enableBackground:"new 0 0 489 489"}} xmlSpace="preserve">
								<g>
									<path d="M440.1,422.7l-28-315.3c-0.6-7-6.5-12.3-13.4-12.3h-57.6C340.3,42.5,297.3,0,244.5,0s-95.8,42.5-96.6,95.1H90.3
										c-7,0-12.8,5.3-13.4,12.3l-28,315.3c0,0.4-0.1,0.8-0.1,1.2c0,35.9,32.9,65.1,73.4,65.1h244.6c40.5,0,73.4-29.2,73.4-65.1
										C440.2,423.5,440.2,423.1,440.1,422.7z M244.5,27c37.9,0,68.8,30.4,69.6,68.1H174.9C175.7,57.4,206.6,27,244.5,27z M366.8,462
										H122.2c-25.4,0-46-16.8-46.4-37.5l26.8-302.3h45.2v41c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h139.3v41
										c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5v-41h45.2l26.9,302.3C412.8,445.2,392.1,462,366.8,462z"/>
								</g>
							</svg>
							<Link to="/cart">
							<div>Panier({cartTotalNumberPlans})</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
        )
    }
}

export default HeaderNew