import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class CancelDohone extends Component{
    render(){
        return (
            
                <div className="container mt-5">
                    <div className="spaceToSee"></div>
                    <div className="row">
                        <div className="col-10 mx-auto text-center">
                            <h2 className="text-uppercase">Votre achat a &eacute;t&eacute; annul&eacute;.</h2>
                            <h3><Link to="/">Continuer les achats</Link></h3>
                        </div>
                    </div>

                </div>
            
        )
    }
}

export default CancelDohone