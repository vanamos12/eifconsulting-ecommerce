
import React, { Component, Suspense, lazy } from 'react';
import {Route, Switch } from 'react-router-dom';
import {ApplicationConsumer} from './context'
import withAuth from './withAuth';
import HeaderNew from './components/HeaderNew'
import {Role} from './data'
import HeaderContent from './components/HeaderContent';


const WelcomeValidate  = lazy(()=>import('./components/validate/WelcomeValidate')) ;


const Home = lazy(()=>import('./components/Home')) ;
const Cart = lazy(()=>import('./components/cart/Cart')) 
const Detail = lazy(()=>import('./components/Detail')) 
const Default = lazy(()=>import('./components/Default')) 
const SendMail = lazy(()=>import('./components/SendMail'))

const Secret = lazy(()=>import('./Secret')) ;
const LoginFrontEnd = lazy(()=>import('./components/LoginFrontEnd')) ;
const SignUpFrontEnd = lazy(()=>import('./components/SignUpFrontEnd')) ;
const AdministrationFrontEnd = lazy(()=>import('./components/frontend/AdministrationFrontEnd')) 
const DetailsFrontEnd = lazy(()=>import('./components/frontend/DetailsFrontEnd')) 
const PrivateRoute = lazy(()=>import('./PrivateRoute'))
const WelcomeSell = lazy(()=>import('./components/sell/WelcomeSell'))
const AddPlanDistribution = lazy(()=>import('./components/sell/AddPlanDistribution'))
const AddPlan3d = lazy(()=>import('./components/sell/AddPlan3d'))
const AddPlanDevis = lazy(()=>import('./components/sell/AddPlanDevis'))
const AdministrationValidatedPlans = lazy(()=>import('./components/sell/validatedplans/AdministrationValidatedPlans')) 
const AdministrationNotValidatedPlans = lazy(()=>import('./components/sell/notvalidatedplans/AdministrationNotValidatedPlans')) 
const AdministrationValidateAdmin = lazy(()=>import('./components/validateadmin/AdministrationValidateAdmin'))
const UserInformations = lazy(()=>import('./components/UserInformations'))

const WelcomeSearchAdministrators = lazy(()=>import('./components/search/searchadministrators/WelcomeSearchAdministrators'))
const SoldPlans = lazy(()=>import('./components/sell/SoldPlans'))
const WelcomeSearchSold = lazy(()=>import('./components/search/searchsold/WelcomeSearchSold'))

const AddPlan = lazy(()=>import('./components/backend/AddPlan')) 
const ModifyPlan = lazy(()=>import('./components/backend/ModifyPlan')) 
const AdministrationBackEnd = lazy(()=>import('./components/backend/AdministrationBackEnd')) 
const SignUpBackEnd = lazy(()=>import('./components/SignUpBackEnd')) 
const LoginBackEnd = lazy(()=>import('./components/LoginBackEnd')) 
const SearchResults = lazy(()=>import('./components/search/SearchResults')) 
const RequestMobilePhone = lazy(()=>import('./components/RequestNumberPhone')) 
const SuccessDohone = lazy(()=>import('./components/SuccesDohone')) 
const CancelDohone = lazy(()=>import('./components/CancelDohone')) 
const VerifyEmail = lazy(()=>import('./components/VerifyEmail'))
const SendPasswordModificationToken = lazy(()=>import('./components/SendPasswordModificationToken'))
const ModifyPassword = lazy(()=>import('./components/ModifyPassword'))

export default class App extends Component {
  render() {
    return (
      <div className="super_container">
        
        <ApplicationConsumer>
          {value=>(
            <React.Fragment>
              <HeaderNew value={value}/>
              <div className="spaceToSee">

              </div>
              <HeaderContent value={value}/>
              {/*<Header value={value}/>
              
          <MenuMobile/>*/}
              <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route 
                  path="/" exact 
                  render={(props)=><Home {...props} value={value}/>} />
                <Route path="/cart" component={Cart} />
                <Route path="/detail" component={Detail} />
                <Route path="/sendmail" component={SendMail} />
                <Route path="/secret" component={withAuth(Secret)} />
                <Route 
                  path="/loginfrontend/:destination" 
                  render={(props) => <LoginFrontEnd {...props} value={value}/>} 
                />
                {/** 
                <Route 
                  path="/administrationfrontend/" 
                  render={(props) => <AdministrationFrontEnd {...props} value={value}/>} 
                />
                */}
                
                <PrivateRoute path='/administrationfrontend' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={AdministrationFrontEnd}/>
                
                <PrivateRoute path='/myinformations' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={UserInformations}/>
                <PrivateRoute path='/sellplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={WelcomeSell}/>
                <PrivateRoute path='/addplandistribution' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={AddPlanDistribution}/>
                <PrivateRoute path='/addplan3d' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={AddPlan3d}/>
                <PrivateRoute path='/addplandevis' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={AddPlanDevis}/>
                
                <PrivateRoute path='/validatedplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={AdministrationValidatedPlans}/>
                <PrivateRoute path='/notvalidatedplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={AdministrationNotValidatedPlans}/>

                <PrivateRoute path='/soldplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur]} component={SoldPlans}/>
                
                <PrivateRoute path='/validateplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur]} component={WelcomeValidate}/>
                <PrivateRoute path='/allplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur]} component={AdministrationBackEnd}/>
                
                <PrivateRoute path='/searchadministrateurplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur]} component={WelcomeSearchAdministrators}/>
                
                <PrivateRoute path='/searchsoldplans' value={value} roles={[Role.Administrateur, Role.SuperAdministrateur]} component={WelcomeSearchSold}/>
                
                <PrivateRoute path='/validateadmin' value={value} roles={[ Role.SuperAdministrateur]} component={AdministrationValidateAdmin}/>
                

                <Route path="/signupfrontend" component={SignUpFrontEnd} />
                <Route path="/detailsfrontend" component={DetailsFrontEnd} />
                <Route 
                  path="/addplan" 
                  render={(props)=><AddPlan {...props} value={value}/>} />
                <Route 
                  path="/modifyplan" 
                  render={(props)=><ModifyPlan {...props} value={value}/>} />
                
                
                <Route path="/signupbackend" component={SignUpBackEnd} />
                <Route 
                  path="/loginbackend/:destination" 
                  render={(props) => <LoginBackEnd {...props} value={value}/>} 
                />
                <Route 
                  path="/searchresults" 
                  render={(props) => <SearchResults {...props} value={value}/>} 
                />
                <Route 
                  path="/numeromobile" 
                  render={(props) => <RequestMobilePhone {...props} value={value}/>} 
                />
                <Route 
                  path="/successdohone" 
                  component={SuccessDohone}
                />
                <Route 
                  path="/canceldohone" 
                  component={CancelDohone}
                />
                <Route 
                  path="/api/verify-email/:emailVerificationToken" 
                  component={VerifyEmail}
                />
                <Route 
                  path="/api/modify-password/:passwordResetToken" 
                  component={ModifyPassword}
                />
                <Route 
                  path="/sendpasswordmodificationtoken" 
                  component={SendPasswordModificationToken}
                />

                {/* Insert the default route */}
                <Route  component={Default} />
              </Switch>
              </Suspense>
            </React.Fragment>
          )}
          
        </ApplicationConsumer>
        
      </div>
    );
  }
}