import React, {Component} from 'react'
import { truncateSync } from 'fs';

class AddPlan extends Component{
    state={
        categorie:'',
        name:'',
        price:'',
        image:React.createRef(),
        description:'',
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
        if (type === "checkbox"){
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
        alert(this.state.image.current.files[0].name)
    }
    render(){
        return (
            <React.Fragment>
                <div className="spaceToSee"></div>
                <div className="container-fluid">
                    <h1>Formulaire d'ajout d'un plan</h1>
                    <form action="#" onSubmit={this.handleSubmit}>
                        <label for="name">Cat&eacute;gorie :
                            <select name="categorie" value={this.state.categorie} onChange={this.handleChange} required>
                                <option disabled></option>
                                <option>Traditionnelle</option>
                                <option>Contemporaine</option>
                                <option>Architecte</option>
                            </select>
                        </label><br/>
                        <label for="name">Nom :&nbsp;  
                            <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                        </label><br/>
                        <label for="price">Prix :&nbsp;  
                            <input type="number" id="price" name="price" value={this.state.price} onChange={this.handleChange} required/>
                        </label><br/>
                        <label for="image">Image :&nbsp; 
                            <input type="file" id="image" ref={this.state.image} required/>
                        </label><br/>
                        <label for="description">Description :&nbsp; 
                            <textarea  id="descrption" name="description" value={this.state.description} onChange={this.handleChange} required/>
                        </label><br/>
                        <div className="row">
                            <div className="col-xs-12 col-md-4 col-lg-3 well">
                                <h3>Style</h3>
                                <label for="isStyleModerne">Style Moderne :&nbsp;
                                <input type="checkbox" id="isStyleModerne" name="isStyleModerne" checked={this.state.isStyleModerne} onChange={this.handleChange}/>
                                </label><br/>
                            
                                <label for="isStyleContemporain">Style Contemporain :&nbsp;
                                <input type="checkbox" id="isStyleContemporain" name="isStyleContemporain" checked={this.state.isStyleContemporain} onChange={this.handleChange}/>
                                </label><br/>   

                                <label for="isStyleTraditionnel">Style Tradtionnel :&nbsp;
                                <input type="checkbox" id="isStyleTraditionnel" name="isStyleTraditionnel" checked={this.state.isStyleTraditionnel} onChange={this.handleChange} />
                                </label>
                            
                            </div>
                            <div className="col-xs-12 col-md-4 col-lg-3 well">
                                <h3>Niveau</h3>
                                <label for="isNiveauPlainPied">Niveau Plain Pied :&nbsp;
                                <input type="checkbox" id="isNiveauPlainPied" name="isNiveauPlainPied" checked={this.state.isNiveauPlainPied} onChange={this.handleChange} />
                                </label><br/>
                            
                                <label for="isNiveauAEtages">Niveau &Agrave; &Eacute;tages :&nbsp;
                                    <input type="checkbox" id="isNiveauAEtages" name="isNiveauAEtages" checked={this.state.isNiveauAEtages} onChange={this.handleChange}/>
                                </label><br/>

                                <label for="isNiveauSousSol">Niveau Sous Sol :&nbsp;
                                    <input type="checkbox" id="isNiveauSousSol" name="isNiveauSousSol" checked={this.state.isNiveauSousSol} onChange={this.handleChange}/>
                                </label>
                            </div>
                            <div className="col-xs-12 col-md-4 col-lg-3 well">
                                <h3>Nombre de chambres</h3>
                                <label for="isChambreTwo">2 :&nbsp;
                                    <input type="checkbox" id="isChambreTwo" name="isChambreTwo" checked={this.state.isChambreTwo} onChange={this.handleChange}/>
                                </label><br/>

                                <label for="isChambreThree">3 :&nbsp;
                                    <input type="checkbox" id="isChambreThree" name="isChambreThree" checked={this.state.isChambreThree} onChange={this.handleChange}/>
                                </label><br/>

                                <label for="isChambreFourMore">4 et + :&nbsp;
                                    <input type="checkbox" id="isChambreFourMore" name="isChambreFourMore" checked={this.state.isChambreFourMore} onChange={this.handleChange}/>
                                </label>
                            </div>
                            
                            <div className="col-xs-12 col-md-6 col-lg-3 well well-sm">
                                <h3>Type</h3>
                                <label for="isCoupCoeur">Coup de Coeur :&nbsp;
                                    <input type="checkbox" id="isCoupCoeur" name="isCoupCoeur" checked={this.state.isCoupCoeur} onChange={this.handleChange}/>
                                </label><br/>

                                <label for="isPopular">Populaire :&nbsp;
                                    <input type="checkbox" id="isPopular" name="isPopular" checked={this.state.isPopular} onChange={this.handleChange}/>
                                </label>
                            </div>
                        </div>
                        
                        {/**Use bootstrap well for styling */}
                        <div className="row">
                            <div className="col-xs-12 col-md-6 col-lg-3">
                                <input type="reset" className="btn btn-default" value="R&eacute;initialiser"/>
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-3">
                                <input type="submit" className="btn btn-primary" value="Sauvegarder"/>
                            </div>
                        </div>
                    </form>

                    
                    <span>categorie: {this.state.categorie}</span><br/>
                    <span>name: {this.state.name}</span><br/>
                    <span>price: {this.state.price}</span><br/>
                    <span>description: {this.state.description}</span><br/>
                    <span>isStyleModerne : {this.state.isStyleModerne ? "true" : "false"}</span><br/>
                    <span>isStyleContemporain: {this.state.isStyleContemporain ? "true" : "false"}</span><br/>
                    <span>isStyleTraditionnel: {this.state.isStyleTraditionnel ? "true" : "false"}</span><br/>
                    <span>isNiveauPlainPied: {this.state.isNiveauPlainPied ? "true" : "false"}</span><br/>
                    <span>isNiveauAEtages: {this.state.isNiveauAEtages ? "true" : "false"}</span><br/>
                    <span>isNiveauSousSol: {this.state.isNiveauSousSol ? "true" : "false"}</span><br/>
                    <span>isChambreTwo: {this.state.isChambreTwo ? "true" : "false"}</span><br/>
                    <span>isChambreThree: {this.state.isChambreThree ? "true" : "false"}</span><br/>
                    <span>isChambreFourMore: {this.state.isChambreFourMore ? "true" : "false"}</span><br/>
                    <span>isCoupCoeur: {this.state.isCoupCoeur ? "true" : "false"}</span><br/>
                    <span>isPopular: {this.state.isPopular ? "true" : "false"}</span><br/>
                    
                </div>
            </React.Fragment>
        )
    }
}


export default AddPlan 