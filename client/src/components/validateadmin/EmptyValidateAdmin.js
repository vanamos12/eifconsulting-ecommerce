import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EmptyValidateAdmin extends Component{
    render(){
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-10 mx-auto text-center">
                        <h2 className="text-uppercase">Il n'y a pas d'administrateurs dans le système.</h2>
                        <h3><Link to="/">Continuer les achats</Link></h3>
                    </div>
                </div>

            </div>
        )
    }
}

export default EmptyValidateAdmin