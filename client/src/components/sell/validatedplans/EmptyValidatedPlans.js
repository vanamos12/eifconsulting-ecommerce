import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EmptyValidatedPlans extends Component{
    render(){
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-10 mx-auto text-center">
                        <h2 className="text-uppercase">Vous n'avez pas de plans valid&eacute;s.</h2>
                        <h3><Link to="/sellplans">Vendre les plans</Link></h3>
                    </div>
                </div>

            </div>
        )
    }
}

export default EmptyValidatedPlans