import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class HeaderNew extends Component{
    render(){
        const {cartTotalNumberPlans, frontEndUser, deconnexion} = this.props.value
        return (
            <div class="header">
				<div class="header-new">
					<div class="logo">
						<img width="125px" height="125px" src="images/logo/logo.jpg" alt="logo"/>
					</div>
					<div class="brand-wrapper">
						<div class="brand">
						Electricité-Informatique-Froid
						</div>
					</div>
					<div class="contact-info">
						<div class="contact">
							<div><i class="fa fa-phone"></i>+237 6 96 12 84 27</div>
							<div><i class="fa fa-envelope"></i>eifconsultingandservices@gmail.com</div>
						</div>
					</div>
				</div>
				<div class="menu-wrapper">
					<div class="menu-left">
						<ul class="menu-list">
							<li>Accueil</li>
							<li>Plans</li>
							<li>&Agrave; propos de nous</li>
							<li>Contact</li>
							<li>Connexion</li>
						</ul>
					</div>
					<div class="menu-right">
						<div class="content">
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
							<div>Panier({cartTotalNumberPlans})</div>
						</div>
					</div>
				</div>
			</div>
        )
    }
}

export default HeaderNew