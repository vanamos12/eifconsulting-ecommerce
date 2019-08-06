import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class AddPlanDistribution extends Component{
    selectedFile = React.createRef()
    vueMasseFile = React.createRef()
    vueAerienneFile = React.createRef()
    vueFaceFile = React.createRef()
    fileExtensionsImage = ['webp', 'jpg', 'png', 'jpeg', 'gif']
    tenMegaInOctets = 10000000
    state={
        categorie:'',
        name:'',
        price:'',
        uploading:false,
        message:'',
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
        isPopular:false,
        percentage:0,
        emailSubmitter:''
    }
    componentDidMount(){
        this.setState({
            emailSubmitter:this.props.value.frontEndUser.email
        })
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
    getFileExtension = (filename) =>{
        if (filename.lastIndexOf('.')>=0){
            return filename.split('.').pop();
        }
        return ''
        
      }
    handleSubmit = (event)=>{
        event.preventDefault()
        if (this.selectedFile.current.files[0].size>this.tenMegaInOctets){ //Convertion de 10Mo en octets
            alert("La taile de l'image ne doit pas être supérieure à 10Mo")
        }else if (!this.fileExtensionsImage.includes(this.getFileExtension(this.selectedFile.current.files[0].name))){
            alert("L'image doit être au format webp, png, jpeg, jpg ou gif")
        }else {

            
        if (this.state.uploading) return
        this.setState({ uploading: true });
        const data = new FormData()
        data.append("file", this.selectedFile.current.files[0], this.selectedFile.current.files[0].name)
        data.append("vuemasse", this.vueMasseFile.current.files[0], this.vueMasseFile.current.files[0].name)
        data.append("vueaerienne", this.vueAerienneFile.current.files[0], this.vueAerienneFile.current.files[0].name)
        data.append("vueface", this.vueFaceFile.current.files[0], this.vueFaceFile.current.files[0].name)
        data.append("data", JSON.stringify(this.state))
        let action = "failure"
        axios
            .post("/api/addplandistribution", data, {onUploadProgress: ProgressEvent =>{
                let percentage = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total)
                this.setState({
                    percentage:percentage
                })
            }})
            .then(res=>{
                if (res.status === 200) {
                    action="succes"
                    
                }else{
                    action="failure"
                    
                }
                return res
            })
            .then(data=>{
                console.log(data)
                if (action === 'succes'){
                    this.setState(()=>{
                        return {
                            message:"Plan crée avec succes",
                            uploading:false
                        }
                    }, ()=>{
                        this.props.value.setAddedPlan(data.data.plan)
                    })
                    
                }else if (action === 'failure'){
                    this.setState({
                        message:"Erreur dans la création du plan",
                        uploading:false
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
        
        
        }
        
    }
    render(){
        return (
            <React.Fragment>
                <div className="spaceToSee"></div>
                <div className="container-fluid text-center">
                    
                    <Link to="/sellplans">Retourner au menu</Link>
                    <h1>Formulaire d'ajout d'un plan de distribution</h1>
                    <form action="#" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="categorie">Cat&eacute;gorie :
                                <select name="categorie" value={this.state.categorie} onChange={this.handleChange} required>
                                    <option disabled></option>
                                    <option>Traditionnelle</option>
                                    <option>Contemporaine</option>
                                    <option>Architecte</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="name">Nom :&nbsp;  
                                <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="price">Prix :&nbsp;  
                                <input type="number" id="price" name="price" value={this.state.price} onChange={this.handleChange} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="image">Image :&nbsp; 
                                <input type="file" id="image" ref={this.selectedFile} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="vueface">Vue de face :&nbsp; 
                                <input type="file" id="vueface" ref={this.vueFaceFile} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="vueaerienne">Vue a&eacute;rienne :&nbsp; 
                                <input type="file" id="vueaerienne" ref={this.vueAerienneFile} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="vuemasse">Vue de masse :&nbsp; 
                                <input type="file" id="vuemasse" ref={this.vueMasseFile} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label for="description">Description :&nbsp; 
                                <textarea  rows="3" cols="100" id="descrption" name="description" value={this.state.description} onChange={this.handleChange} required/>
                            </label>
                        </div>
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
                        
                        <div className="text-danger">{this.state.message}</div>
                        {
                            this.state.uploading ? 
                            <React.Fragment>
                                <img 
                                    width="75px" 
                                    height="75px" 
                                    src="images/gif/giphyhourglass.gif" 
                                    alt="Chargement"/>
                                <span>{this.state.percentage}%</span>
                            </React.Fragment>
                            : 
                            null
                        }
                        {/**Use bootstrap well for styling */}
                        <div className="row">
                            <div className="col-xs-12 col-md-6 col-lg-6">
                                <input type="reset" className="btn btn-default" value="R&eacute;initialiser"/>
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-6">
                                <input type="submit" className="btn btn-primary" value="Sauvegarder"/>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default AddPlanDistribution