import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import PrivateDetail from './PrivateDetail'

class DetailsFrontEnd extends Component{
    state={
        privateDetail:false,
        plan:{}
    }
    componentDidMount(){
        const {_id} = this.props.location.state.item
        fetch('/api/private-detail', {
            method:'POST',
            body:JSON.stringify({idPlan:_id}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.status === 200){
                this.setState({
                    privateDetail:true,
                    plan:data.plan
                })
            }
        })
        .catch(err=>console.log(err))
    }
    render(){
        const {image, price, name, description} = this.props.location.state.item
        return (
            <React.Fragment>

                    <div className="spaceToSee">

                    </div>
                <div className="container py-5">
                {/* title */}
                <div className="row">
                    <div className = "col-10 mx-auto text-center text-slanted text-blue my-5">
                        <h1>{name}</h1>
                    </div>
                </div>
                {/* end title */}
                {/* product info */}
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                        <img src={image} className="img-fluid" alt="product"/>
                    </div>
                    {/* product text */}
                    <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                        <h4 className="text-blue">
                            <strong>
                                Price : {price} <span>FCFA</span>
                            </strong>
                        </h4>
                        <p className="text-capitalize font-weight-bold mt-3 mb-0">
                            Quelques informations sur le plan
                        </p>
                        <p className="text-muted lead">{description}</p>
                        {/* Buttons */}
                        
                        {
                            this.state.privateDetail 
                            ?
                                <PrivateDetail plan={this.state.plan}/>
                            :
                                null
                        }

                        <div>
                            <Link to="/">
                                <span>Rentrer aux plans</span>
                            </Link>
                        </div>

                    </div>
                </div>
                </div>
            </React.Fragment>
        )
    }
}
export default DetailsFrontEnd