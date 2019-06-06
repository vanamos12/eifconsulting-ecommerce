import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EmptySearch extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-10 mx-auto text-center">
                            <h2 className="text-uppercase">Aucun r&eacute;sultat ne correspond &agrave; votre recherche.</h2>
                            <h3><Link to="/">Continuer les achats</Link></h3>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default EmptySearch