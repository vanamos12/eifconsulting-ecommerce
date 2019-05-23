import React, {Component} from 'react'
import {ApplicationConsumer} from '../context'


class Slider extends Component{
    render(){
        return (
            <ApplicationConsumer>
                {(value)=>{
                    const {image1, image2, image3} = value.sliderImages
                    return (
                    <div className="home">
                    <div className="home_slider_container">
                        
                        {/* Home Slider */}
                        <div className="owl-carousel owl-theme home_slider">
                            
                            {/* Slider Item */}
                            <div className="owl-item home_slider_item">
                                <div className="home_slider_background" style={{backgroundImage:`url(${image1})`}}></div>
                                <div className="home_slider_content_container">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="home_slider_content"  data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                                                    <div className="home_slider_title">Un nouveau site de vente en ligne pr&ecirc;t pour vous.</div>
                                                    <div className="home_slider_subtitle">Un site nouvellement mis en place pour r&eacute;pondre &arave; tous vos besoins de plans de maison.</div>
                                                    <div className="button button_light home_button"><a href="#">Achetez maintenant</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            {/* Slider Item */}
                            <div className="owl-item home_slider_item">
                                <div className="home_slider_background" style={{backgroundImage:`url(${image2})`}}></div>
                                <div className="home_slider_content_container">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="home_slider_content"  data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                                                    <div className="home_slider_title">Une exp&eacute;rience d'achat unique.</div>
                                                    <div className="home_slider_subtitle">Visitez notre site, avec son interface de qualité, vous serez surpris par vos d&eacute;couvertes.</div>
                                                    <div className="button button_light home_button"><a href="#">D&eacute;couvrir maintenant</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            {/* Slider Item */}
                            <div className="owl-item home_slider_item">
                                <div className="home_slider_background" style={{backgroundImage:`url(${image3})`}}></div>
                                <div className="home_slider_content_container">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="home_slider_content"  data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                                                    <div className="home_slider_title">Ne vous fa&icirc;tes plus tromper.</div>
                                                    <div className="home_slider_subtitle">De nouveaux plans qui correspondent &agrave; vos besoins actuels et futurs.</div>
                                                    <div className="button button_light home_button"><a href="#">Voir maintenant</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                        </div>
        
                        {/* Home Slider Dots */}
                        
                        <div className="home_slider_dots_container">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <div className="home_slider_dots">
                                            <ul id="home_slider_custom_dots" className="home_slider_custom_dots">
                                                <li className="home_slider_custom_dot active">01.</li>
                                                <li className="home_slider_custom_dot">02.</li>
                                                <li className="home_slider_custom_dot">03.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>	
                        </div>
        
                    </div>
                </div>
                )
                }}
            </ApplicationConsumer>
            
        )
    }
}

export default Slider