import React, {Component} from 'react'

class Titre extends Component{
    render(){
        const {titre} = this.props
        return (
            <div className="titre">
                <div className="text-center display-7">
                    <h2>{titre}</h2>
                </div>
            
            </div>
        )
    }
}

export default Titre