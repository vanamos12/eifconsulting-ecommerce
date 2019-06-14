import React, {Component} from 'react'

class QualityBox extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="avds_xl">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="avds_xl_container clearfix">
                                    <div className="avds_xl_background" style={{backgroundImage:"url(images/slider/house-3391572_960_720.jpg)"}}></div>
                                    <div className="avds_xl_content">
                                        <div className="avds_title">Plans de  qualit&eacute;</div>
                                        <div className="avds_text">Nous concevons des plans qui r&eacute;pondent &agrave; vos attentes.</div>
                                        <div className="avds_link avds_xl_link"><a href="categories.html">Voir plus</a></div>
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
export default QualityBox