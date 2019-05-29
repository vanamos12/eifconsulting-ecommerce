import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Default extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="spaceToSee">
                </div>
                <div className="container text-center">
                    <h1>Page non trouv&eacute;e, &eacute;rreur 404</h1>
                    <h4><Link to="/">Continuer les achats</Link></h4>
                </div>
            </React.Fragment>
        )
    }
}

export default Default