import React, {Component} from 'react'

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
                            <a href={grosOeuvreFile}>Gros oeuvre</a><br/>
                            <a href={secondOeuvreFile}>Second oeuvre</a><br/>
                            <a href={charpenteToitureFile}>Charpente et toiture</a><br/>
                        </div>;
        }else{
            download = <div>
                            <a href={vueMasseFile}>Vue de masse </a><br/>
                            <a href={vueAerienneFile}>Vue a&eacute;rienne</a><br/>
                            <a href={vueFaceFile}>Vue de face</a><br/>
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