import React, {Component} from 'react'

class UserInformations extends Component{
    render(){
        const user = this.props.value.frontEndUser.user
        return (
            <div className="informations">
                {/* <div className="spaceToSee"></div> */}
                <div className="container text-center">
                    <h1>Informations de l'utilisateur</h1>
                    <h2>Nom : <b>{user.name}</b></h2>
                    <h2>Pr&eacute;nom : <b>{user.surname}</b></h2>
                    <h2>R&ocirc;le : <b>{user.role}</b></h2>
                    <h2>Email : <b>{user.email}</b></h2>
                    <h2>T&eacute;l&eacute;phone : <b></b>{user.telephone}</h2>
                </div>
            </div>
        )
    }
}

export default UserInformations