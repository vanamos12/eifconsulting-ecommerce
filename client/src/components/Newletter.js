import React, {Component} from 'react'

class Newletter extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="newsletter">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="newsletter_border"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="newsletter_content text-center">
                                    <div className="newsletter_title">Souscrivez &agrave; notre newsletter</div>
                                    <div className="newsletter_text"><p>Vous serez inform&eacute;s de la sortie de ouveux plans.</p></div>
                                    <div className="newsletter_form_container">
                                        <form action="#" id="newsletter_form" className="newsletter_form">
                                            <input type="email" className="newsletter_input" required="required"/>
                                            <button className="newsletter_button trans_200"><span>Souscrire</span></button>
                                        </form>
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
export default Newletter