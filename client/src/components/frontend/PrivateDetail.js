import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class PrivateDetail extends Component{
    render(){
        let download = null
        const type = this.props.plan.type
        const {vueMasseFile,
        vueAerienneFile,
        vueFaceFile} = this.props.plan;
        const {grosOeuvreFile,
        secondOeuvreFile,
        charpenteToitureFile} = this.props.plan
        if (type === "Devis"){
            download = <div>
                            <Link to={grosOeuvreFile} target="_blank" download>Gros oeuvre</Link><br/>
                            <Link to={secondOeuvreFile} target="_blank" download>Second oeuvre</Link><br/>
                            <Link to={charpenteToitureFile} target="_blank" download>Charpente et toiture</Link><br/>
                        </div>;
        }else{
            download = <div>
                            <Link to={vueMasseFile} target="_blank" download>Vue de masse </Link><br/>
                            <Link to={vueAerienneFile} target="_blank" download>Vue a&eacute;rienne</Link><br/>
                            <Link to={vueFaceFile} target="_blank" download>Vue de face</Link><br/>
                        </div>;
        }

        return (
            <div>
                <span>Type: {type}</span><br/>
                {download}
            </div>
        )
    }
}

export default PrivateDetail