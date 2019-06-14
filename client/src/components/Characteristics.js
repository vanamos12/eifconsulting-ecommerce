import React, {Component} from 'react'

class Characteristics extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="icon_boxes">
                    <div className="container">
                        <div className="row icon_box_row">
                            
                            
                            <div className="col-lg-4 icon_box_col">
                                <div className="icon_box">
                                    <div className="icon_box_image"><img src="images/icon_1.svg" alt=""/></div>
                                    <div className="icon_box_title">Partout dans le monde</div>
                                    <div className="icon_box_text">
                                        <p>Nous vous envoyons nos plans, quelque soit l'endroit o&ugrave; vous &ecirc;tes dans le monde.</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="col-lg-4 icon_box_col">
                                <div className="icon_box">
                                    <div className="icon_box_image"><img src="images/icon_2.svg" alt=""/></div>
                                    <div className="icon_box_title">Qualit&eacute; garantie</div>
                                    <div className="icon_box_text">
                                        <p>Nous vous offrons les meilleurs plans &agrave; un prix raisonnable.</p>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="col-lg-4 icon_box_col">
                                <div className="icon_box">
                                    <div className="icon_box_image"><img src="images/icon_3.svg" alt=""/></div>
                                    <div className="icon_box_title">24h Support rapide</div>
                                    <div className="icon_box_text">
                                        <p>Nous sommes disponibles 24h/24, 7j/7 pour r&eacute;pondre &agrave; toutes vos pr&eacute;occupations.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Characteristics