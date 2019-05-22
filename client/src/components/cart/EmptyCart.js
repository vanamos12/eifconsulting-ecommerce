import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EmptyCart extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-10 mx-auto text-center">
                            <h2 className="text-uppercase">Votre panier est vide.</h2>
                            <h3><a href="/">Continuer les achats</a></h3>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default EmptyCart