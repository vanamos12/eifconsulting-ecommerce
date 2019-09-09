import React, {Component} from 'react'
import EmptyValidateAdmin from './EmptyValidateAdmin'
import ValidateAdminColumns from './ValidateAdminColumns'
import ValidateAdminList from './ValidateAdminList'


class AdministrationValidateAdmin extends Component{
    render(){
        const administrators = this.props.value.administrators
        const value = this.props.value
        if (administrators.length === 0){
            return (
                <React.Fragment>
                    <div id="cart">
                        {/*<div className="spaceToSee">

                        </div>*/}
                        <EmptyValidateAdmin/>
                    </div>
                </React.Fragment>
                )
        }else{
            return (
                <React.Fragment>
                    <div id="cart">
                    {/*<div className="spaceToSee">

                    </div>*/}
                    
                    <div className="cart_info">
                        <div className="container">
                            <h1 className="text-center">Liste des administrateurs</h1>
                            <ValidateAdminColumns/>
                            <ValidateAdminList value={value}/>
                            
                        </div> 
                    </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default AdministrationValidateAdmin