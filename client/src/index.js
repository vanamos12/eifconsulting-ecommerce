import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom'; 
import Loadable from 'react-loadable'
import * as serviceWorker from './serviceWorker';
//import {BrowserRouter as Router} from 'react-router-dom'
//import {ApplicationProvider} from './context'
import Footer from './components/Footer'

const Router = Loadable({
    loader: ()=>import('react-router-dom'),
    loading:()=><div>Chargement...</div>,
    render:(loaded, props)=>{
        let Component = loaded.BrowserRouter
        return <Component {...props}/>
    }
})
const ApplicationProvider = Loadable({
    loader:()=>import('./context'),
    loading:()=><div>Chargement...</div>,
    render:(loaded, props)=>{
        let Component = loaded.ApplicationProvider
        return <Component {...props}/>
    }
})
//const {BrowserRouter:Router} = lazy(()=>import('react-router-dom'))
//const {ApplicationProvider} = lazy(()=>import('./context'))
//const App = lazy(()=>import('./App'))
const App = Loadable({
    loader:()=>import('./App'),
    loading:()=><div>Chargement...</div>
})

ReactDOM.render(
    <React.Fragment>
        <Router>
            <ApplicationProvider>
                <App />
            </ApplicationProvider>
        </Router>
        <div id="footer">
            <Footer/>
        </div>
    </React.Fragment>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
