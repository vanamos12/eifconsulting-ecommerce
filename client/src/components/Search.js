import React, {Component} from 'react'

class Search extends Component{
    render(){
        return (
            <div className="recherche">
                <div className="container">
                <div className="contenu">
                    <div className="row d-flex justify-content-between align-items-center px-4 pt-3">
                        <a href="" className="btn btn-primary"><i className="fa fa-home"></i>Tout voir</a>
                        <a href="" className="btn btn-primary"><i className="fa fa-home"></i>Maison Traditionnelle</a>
                        <a href="" className="btn btn-primary"><i className="fa fa-home"></i>Maison Contemporaine</a>
                        <a href="" className="btn btn-primary"><i className="fa fa-home"></i>Maison d'architecte</a>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
                            <div className="styles pb-4">
                            <h3>Styles</h3>
                            <label for="moderne">
                                <input type="checkbox" id="moderne" name="moderne"/>Moderne
                            </label><br/>
                            <label for="contemporain">
                                <input type="checkbox" id="contemporain" name="contemporain"/>Contemporain
                            </label><br/>
                            <label for="traditionnel">
                                <input type="checkbox" id="traditionnel" name="traditionnel"/>Traditionnel
                            </label><br/>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
                            <div className="niveaux pb-4">
                            <h3>Niveaux</h3>
                            <label for="plainpied">
                                <input type="checkbox" id="plainpied" name="plainpied"/>Plain pied
                            </label><br/>
                            <label for="aetages">
                                <input type="checkbox" id="aetages" name="aetages"/>&Agrave; &eacute;tages
                            </label><br/>
                            <label for="soussol">
                                <input type="checkbox" id="soussol" name="soussol"/>Sous sol
                            </label><br/>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
                            <div className="chambres pb-4">
                            <h3>Chambres</h3>
                            <label for="deux">
                                <input type="checkbox" id="deux" name="deux"/>2
                            </label><br/>
                            <label for="trois">
                                <input type="checkbox" id="trois" name="trois"/>3
                            </label><br/>
                            <label for="quatreetplus">
                                <input type="checkbox" id="quatreetplus" name="quatreetplus"/>4 et +
                            </label><br/>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 rechercher text-center">
                            <button className="btn btn-primary">Rechercher</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Search 