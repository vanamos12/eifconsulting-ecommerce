import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EmptyBackEnd extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-10 mx-auto text-center">
                            <h2 className="text-uppercase">Vous n'avez pas de plans sauvegardés.</h2>
                            <h3><Link to="/addplan">Ajouter un plan</Link></h3>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default EmptyBackEnd