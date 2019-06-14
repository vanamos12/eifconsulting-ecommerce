import React, {Component} from 'react'
import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';


class SliderSandBox extends Component{
    render(){
        
        const content = [
            {
                image:"images/slider/beautiful-home-2826052_960_720.jpg",
                title:"Un nouveau site de vente en ligne pr&ecirc;t pour vous.",
                description:"Un site nouvellement mis en place pour r&eacute;pondre &arave; tous vos besoins de plans de maison.",
                button:"Achetez maintenant"
            },
            {
                image:"images/slider/house-2473443_960_720.jpg",
                title:"Une exp&eacute;rience d'achat unique.",
                description:"Visitez notre site, avec son interface de qualité, vous serez surpris par vos d&eacute;couvertes.",
                button:"D&eacute;couvrez maintenant"
            },
            {
                image:"images/slider/new-england-1336173_960_720.jpg",
                title:"Ne vous fa&icirc;tes plus tromper.",
                description:"De nouveaux plans qui correspondent &agrave; vos besoins actuels et futurs.",
                button:"Voyez maintenant"
            }
        ];
        return (
            <div className="blocCenter">
                <Slider >
                    {content.map((item, index) => (
                        <div
                            key={index}
                            style={{ background: `url(${item.image}) no-repeat center center` }}
                        >
                            <div className="center">
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <button>{item.button}</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        )
    }
}
export default SliderSandBox