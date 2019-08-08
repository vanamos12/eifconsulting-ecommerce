import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class EmptyBackEnd extends Component{
    render(){
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-10 mx-auto text-center">
                            {
                                this.props.type === 'search'?
                                <h2 className="text-uppercase">Votre recherche n'a pas donn&eacute; de r&eacute;sultats.</h2>
                                :
                                <h2 className="text-uppercase">Vous n'avez pas de plans.</h2>
                            }
                            
                            
                        </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default EmptyBackEnd