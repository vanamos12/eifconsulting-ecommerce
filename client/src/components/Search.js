import React, {Component} from 'react'

class Search extends Component{
    state={
        categorie:'',
        isAll:false,
        isStyleModerne: false,
        isStyleContemporain: false,
        isStyleTraditionnel: false,
        isNiveauPlainPied: false,
        isNiveauAEtages: false,
        isNiveauSousSol: false,
        isChambreTwo: false,
        isChambreThree: false,
        isChambreFourMore: false,
        isCoupCoeur:false,
        isPopular:false
    }
    handleChange = (event)=>{
        const {name, value, type, checked} = event.target
        if (type==="checkbox"){
            this.setState({
                [name]:checked
            })
        }else{
            this.setState({
                [name]:value
            })
        }
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        let action = ''
        fetch("/api/search", {
            method:"POST",
            body:JSON.stringify(this.state),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res=>{
            if (res.status === 200){
                action = "succes"
            }else{
                action = "failure"
            }
            return res.json()
        })
        .then(data=>{
            if (action === "succes"){
                console.log(data.results)
                //this.props.value.setResults(data.results, this.props.results)
            }
        })
    }
    render(){
        return (
            <div className="recherche">
                <div className="container">
                <form onSubmit={this.handleSubmit}>
                <div className="contenu">
                    <div className="row d-flex justify-content-between align-items-center px-4 pt-3">
                        <div className="btn btn-primary">
                            <label for="isAll">
                                <i className="fa fa-home"></i>
                                Tout voir
                                <input 
                                    type="checkbox" 
                                    name="isAll" 
                                    id="isAll" 
                                    checked={this.state.isAll} 
                                    onChange={this.handleChange}/>
                            </label>
                        </div>
                        <div className="btn btn-primary">
                            <label for="Traditionnelle">
                                <i className="fa fa-home"></i>
                                Maison Traditionnelle
                                <input 
                                    type="radio" 
                                    value="Traditionnelle" 
                                    checked={this.state.categorie === "Traditionnelle"}
                                    name="categorie"
                                    onChange={this.handleChange}/>
                            </label>
                        </div>
                        <div className="btn btn-primary">
                            <label for="Contemporaine">
                                <i className="fa fa-home"></i>
                                Maison Contemporaine
                                <input 
                                    type="radio" 
                                    value="Contemporaine" 
                                    checked={this.state.categorie === "Contemporaine"}
                                    name="categorie"
                                    onChange={this.handleChange}/>
                            </label>
                        </div>
                        <div className="btn btn-primary">
                            <label for="Architecte">
                                <i className="fa fa-home"></i>
                                Maison d'architecte
                                <input 
                                    type="radio" 
                                    value="Architecte" 
                                    checked={this.state.categorie === "Architecte"}
                                    name="categorie"
                                    onChange={this.handleChange}/>
                            </label>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
                            <div className="styles pb-4">
                            <h3>Styles</h3>
                            <label for="isStyleModerne">
                                <input 
                                    type="checkbox" 
                                    id="isStyleModerne" 
                                    name="isStyleModerne" 
                                    checked={this.state.isStyleModerne}
                                    onChange={this.handleChange}/>
                                    Moderne
                            </label><br/>
                            <label for="isStyleContemporain">
                                <input 
                                    type="checkbox" 
                                    id="isStyleContemporain" 
                                    name="isStyleContemporain" 
                                    checked={this.state.isStyleContemporain}
                                    onChange={this.handleChange}/>
                                    Contemporain
                            </label><br/>
                            <label for="isStyleTraditionnel">
                                <input 
                                    type="checkbox" 
                                    id="isStyleTraditionnel" 
                                    name="isStyleTraditionnel" 
                                    checked={this.state.isStyleTraditionnel}
                                    onChange={this.handleChange}/>
                                    Traditionnel
                            </label><br/>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
                            <div className="niveaux pb-4">
                            <h3>Niveaux</h3>
                            <label for="isNiveauPlainPied">
                                <input 
                                    type="checkbox" 
                                    id="isNiveauPlainPied" 
                                    name="isNiveauPlainPied" 
                                    checked={this.state.isNiveauPlainPied}
                                    onChange={this.handleChange}/>
                                    Plain pied
                            </label><br/>
                            <label for="isNiveauAEtages">
                                <input 
                                    type="checkbox" 
                                    id="isNiveauAEtages" 
                                    name="isNiveauAEtages" 
                                    checked={this.state.isNiveauAEtages}
                                    onChange={this.handleChange}/>
                                    &Agrave; &eacute;tages
                            </label><br/>
                            <label for="isNiveauSousSol">
                                <input 
                                    type="checkbox" 
                                    id="isNiveauSousSol" 
                                    name="isNiveauSousSol" 
                                    checked={this.state.isNiveauSousSol}
                                    onChange={this.handleChange}/>
                                    Sous sol
                            </label><br/>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
                            <div className="chambres pb-4">
                            <h3>Chambres</h3>
                            <label for="isChambreTwo">
                                <input 
                                    type="checkbox" 
                                    id="isChambreTwo" 
                                    name="isChambreTwo" 
                                    checked={this.state.isChambreTwo}
                                    onChange={this.handleChange}/>
                                    2
                            </label><br/>
                            <label for="isChambreThree">
                                <input 
                                    type="checkbox" 
                                    id="isChambreThree" 
                                    name="isChambreThree" 
                                    checked={this.state.isChambreThree}
                                    onChange={this.handleChange}/>
                                    3
                            </label><br/>
                            <label for="isChambreFourMore">
                                <input 
                                    type="checkbox" 
                                    id="isChambreFourMore" 
                                    name="isChambreFourMore" 
                                    checked={this.state.isChambreFourMore} 
                                    onChange={this.handleChange}/>
                                    4 et +
                            </label><br/>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 rechercher text-center">
                            <button type="submit" className="btn btn-primary">Rechercher</button>
                        </div>
                    </div>
                </div>
                </form>
                </div>
            </div>
        )
    }
}

export default Search 