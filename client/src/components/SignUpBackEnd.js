import React, {Component} from 'react'

class SignUpBackEnd extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password: '',
            message:'',
            name:'',
            surname:'',
            telephone:''
        };
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        let action = 'notsignedup'
        fetch('/api/signupBackEnd', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
            action = 'signedup'
            this.props.history.push('/loginbackend/signup');
            return res.json()
            
            } else {
            const error = new Error(res.error);
            //throw error;
            return res.json()
            }
        })
        .then(data =>{
            if (action !== 'signedup'){
            this.setState({message:data.message})
            }
        })
        .catch(err => {
            console.error(err);
            //alert('Error Sign up in please try again');
        });
    }
    render() {
        return (
            <div className="signup">
            {/* <div className="spaceToSee"></div> */}
            <div className="container text-center">
            <h1>Incrivez-vous au back end ici!</h1>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Entrez votre nom"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    className="form-control"
                    type="text"
                    name="surname"
                    placeholder="Entrez votre pr&eacute;nom"
                    value={this.state.surname}
                    onChange={this.handleInputChange}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    className="form-control"
                    type="number"
                    name="telephone"
                    placeholder="Entrez votre t&eacute;l&eacute;phone"
                    value={this.state.telephone}
                    onChange={this.handleInputChange}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Entrez votre email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                />
                </div>
                <div className="form-group">
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                />
                </div>
            <input className="btn btn-primary" type="submit" value="Soumettre"/>
            <div className="text-danger">{this.state.message}</div>
            </form>
            </div>
            </div>
        );
    }
}

export default SignUpBackEnd