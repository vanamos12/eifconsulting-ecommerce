import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component:Component, roles, value, ...rest})=>(
    <Route {...rest} render={props=>{
        let role = value.frontEndUser.role
        if (role === ''){
            // not logged, redirect to login page
            return <Redirect to={{pathname:'/loginfrontend/home', state:{from:props.location}}}/>
        }

        if (roles && !roles.includes(role)){
            // role not autorized so redirect to home page
            return <Redirect to={{pathname: '/'}} />
        }

        // authorized so return component
        return <Component {...props} value={value}/>
    }}/>
)

export default PrivateRoute