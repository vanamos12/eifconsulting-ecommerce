import React, { Component } from 'react'
import {sliderImages, Role} from './data'

const ApplicationContext = React.createContext()

class ApplicationProvider extends Component{

    state={
        plansPopular:[],
        plansCoupCoeur:[],
        detailPlan: {},
        cart:[],
        allPlans:[],
        sliderImages:{},
        modalOpen:false,
        //modalProduct:detailProduct,
        search:{
           results:[],
           resultsAdministrators:[]
        },
        frontEndUser:{
            connected:false,
            role:'',
            email:'',
            tabIdPlans:[],
            tabPlansValidated:[],
            tabPlansNotValidated:[],
            tabPlansSold:[],
            percentageToRefill:0
        },
        backEndUser:{
            connected:false,
            email:'',
            allPlans:[]
        },
        administrators:[],
        cartSubTotal:0,
        cartTotalNumberPlans:0,
        cartTax:0,
        cartTotal:0
    }
    componentDidMount(){
        this.setApplicationPlans()
    }
    setResults = (results, history)=>{
        let search = {...this.state.search}
        results.forEach((item)=>{
            item.total = 0
            item.inCart = false 
            item.count = 0
        })
        search.results = results
        this.setState(()=>{
            return {search:search}
        }, ()=>{
            history.push('/searchresults')
        })
    }
    setSearchAdministratorsPlans = (plans)=>{
        let search = {...this.state.search}
        search.resultsAdministrators = plans
        this.setState({
            search:search
        })
    }
    setAddedPlan = (plan)=>{
        let frontEndUser = {...this.state.frontEndUser}
        frontEndUser.tabPlansNotValidated.push(plan)
        let backEndUser = {...this.state.backEndUser}
        if ([Role.Administrateur, Role.SuperAdministrateur].includes(frontEndUser.role)){
            backEndUser.allPlans.push(plan)
        }
        
        this.setState({
            frontEndUser:frontEndUser,
            backEndUser:backEndUser
        })
        /*
        let allPlans = this.state.backEndUser.allPlans.map(function(item){return item})
        allPlans.push(plan);
        let backEndUser = {...this.state.backEndUser}
        backEndUser.allPlans = allPlans
        this.setState({
            backEndUser:backEndUser
        })*/
    }
    setModifiedPlan = (plan)=>{
        let allPlans = this.state.backEndUser.allPlans.map(function(item){return item})
        const index = allPlans.findIndex(function(item){
            return item._id === plan._id
        })
        if (index>=0){
            
            allPlans[index].categorie=plan.categorie
            allPlans[index].name=plan.name
            allPlans[index].price=plan.price
            allPlans[index].image=plan.image
            allPlans[index].description=plan.description
            allPlans[index].isStyleModerne= plan.isStyleModerne
            allPlans[index].isStyleContemporain= plan.isStyleContemporain
            allPlans[index].isStyleTraditionnel= plan.isStyleTraditionnel
            allPlans[index].isNiveauPlainPied= plan.isNiveauPlainPied
            allPlans[index].isNiveauAEtages= plan.isNiveauAEtages
            allPlans[index].isNiveauSousSol= plan.isNiveauSousSol
            allPlans[index].isChambreTwo= plan.isChambreTwo
            allPlans[index].isChambreThree= plan.isChambreThree
            allPlans[index].isChambreFourMore= plan.isChambreFourMore
            allPlans[index].isCoupCoeur=plan.isCoupCoeur
            allPlans[index].isPopular=plan.isPopular
            let backEndUser = {...this.state.backEndUser}
            backEndUser.allPlans = allPlans
            this.setState({
                backEndUser:backEndUser
            })
        }
    }
    deconnexion = ()=>{
        let frontEndUser = {...this.state.frontEndUser}
        frontEndUser.connected = false
        frontEndUser.email = ''
        frontEndUser.role = ''
        frontEndUser.tabIdPlans = []
        frontEndUser.tabPlansValidated=[]
        frontEndUser.tabPlansNotValidated=[]
        frontEndUser.tabPlansSold=[]
        frontEndUser.percentageToRefill=0
        let search = {...this.state.search}
        search.results = []
        search.resultsAdministrators = []
        let backEndUser = {...this.state.backEndUser}
        backEndUser.allPlans = []
        let administrators = []
        
        fetch('/api/clearCookie')
        .then(res=>{
            if (res.status === 200){
                console.log('cookie cleared')
                this.setState(()=>{
                    return {
                        frontEndUser:frontEndUser,
                        search:search,
                        backEndUser:backEndUser,
                        administrators:administrators
                    }
                })
            }else{
                console.log('cookie not cleared')
            }
        })
        .catch(err =>{
            console.log(err)
        })
       
    }
    savePayments = ()=>{
        let tabIdPlans = [...this.state.cart]
        let email = this.state.frontEndUser.email
        fetch('/api/savePaymentsFrontEnd', {
            method: 'POST',
            body: JSON.stringify({email:email, tabIdPlans:tabIdPlans}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
              if (res.status === 200){
                  // payments are saved
                  console.log('payments are saved')
                  let tabId = [...this.state.frontEndUser.tabIdPlans]
                  let addTabPlansBuyed = tabIdPlans.filter(item=>{
                    return !tabId.some(itemBuy=>itemBuy._id === item._id)
                  })
                /*let addTabPlansBuyed = tabIdPlans.map(item=>{
                    if (tabId.findIndex(function(itemBuy){
                        return itemBuy._id === item._id
                    }) < 0){
                    return item
                    }
                })*/
                let tabPlansBuyed = [...tabId, ...addTabPlansBuyed]
                let frontEndUser = {...this.state.frontEndUser}
                frontEndUser.tabIdPlans = tabPlansBuyed
                this.setState({
                    frontEndUser:frontEndUser
                })
              }else {
                // payments are not saved
                console.log('Payments are not saved')
              }
          })
          .catch(err =>{
              console.log(err)
          })
    }
    setApplicationPlans = () =>{
        fetch('/api/getFrontEndUserAllPlans')
        .then(res=>res.json())
        .then(data=>{
            data.allPlans.forEach(item=>{
                item.inCart = false
                item.count = 0
                item.total = 0
            })
            this.setState(
                {
                    allPlans:data.allPlans
                }
            )
        })
        .catch(err=>{
            console.log(err)
        })
        fetch('/api/homePopular')
        .then(res=>res.json())
        .then(data=>{
            data.plansPopular.forEach(item=>{
                item.inCart = false
                item.count = 0
                item.total = 0
            })
            
            this.setState(()=>{
                return {
                    plansPopular:data.plansPopular
                    
                }
            })
        })
        .catch(err=>{
            console.log(err)
        })
        fetch('/api/home', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
            .then(res => {
                
                return res.json()
            })
            .then(data => {
                
                data.plansCoupCoeur.forEach(item=>{
                    item.inCart = false
                    item.count = 0
                    item.total = 0
                })
                
                this.setState(()=>{
                    return {
                        plansCoupCoeur:data.plansCoupCoeur,
                        sliderImages:sliderImages
                    }
                })
                console.log("data from data ", data)
            })
            .catch(err => {
                console.error(err);
                alert('Error getting the plans in please try again');
            });
            let action = ''
            fetch('/checkTokenFrontEnd', {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
              .then(res => {
                  if (res.status === 401){
                      
                      action='notConnected'
                  }else if(res.status === 200){
                      action  = 'connected'
                      return res.json();
                      
                  }
                  else{
                      console.log(res.status)
                      console.log("Erreur inconnue")
                  }
                })
              .then(data =>{
                if (action === 'connected'){
                    console.log(data.role)
                    let frontEndUser = {...this.state.frontEndUser}
                    let backEndUser = {...this.state.backEndUser}
                    let administrators = [...this.state.administrators]
                    if ([Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur].includes(data.role)){
                        frontEndUser.connected = true
                        frontEndUser.email = data.email
                        frontEndUser.role = data.role
                        frontEndUser.tabIdPlans = data.tabIdPlans
                        frontEndUser.tabPlansValidated = data.tabPlansValidated
                        frontEndUser.tabPlansNotValidated = data.tabPlansNotValidated
                        frontEndUser.tabPlansSold = data.tabPlansSold
                        frontEndUser.percentageToRefill = data.percentageToRefill
                    } 
                    if ([Role.Administrateur, Role.SuperAdministrateur].includes(data.role)){
                        backEndUser.allPlans = data.allPlans
                    } 
                    if ([Role.SuperAdministrateur].includes(data.role)){
                        administrators = data.administrators
                    }
                    /*
                    let frontEndUser = {...this.state.frontEndUser}
                    frontEndUser.connected = true
                    frontEndUser.email = data.email
                    frontEndUser.role = data.role 
                    frontEndUser.tabIdPlans = data.tabIdPlans
                    frontEndUser.tabPlansValidated =  data.tabPlansValidated
                    frontEndUser.tabPlansNotValidated = data.tabPlansNotValidated
                    frontEndUser.tabPlansSold = data.tabPlansSold
                    */
                    this.setState(()=>{
                        return {
                            frontEndUser:frontEndUser,
                            backEndUser:backEndUser,
                            administrators:administrators
                        }
                    })
                }
              })
              .catch(err=>{
                  console.error(err)
              })
        let actionTwo = ''
        fetch('/checkTokenBackEnd')
        .then(res=>{
            if (res.status === 200){
                actionTwo = "succes"
            }else{
                actionTwo = "failure"
            }
            return res.json()
        })
        .then(data=>{
            if (actionTwo === 'succes'){
                let backEndUser = {...this.state.backEndUser}
                backEndUser.connected = true
                backEndUser.email = data.email
                backEndUser.allPlans = data.allPlans

                this.setState(()=>{
                    return {
                        backEndUser:backEndUser
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
        /*let tempProducts = []
        storeProducts.forEach(item =>{
            const singleItem = {...item}
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(()=>{
            return {products:tempProducts}
        })*/
    }
    setDetailPlan = (id)=>{
        const plan = this.getItem(id);
        const copyPlan = {...plan}
        this.setState({
            detailPlan:copyPlan
        })
    }
    setActivePlan = (id)=>{
        fetch('/api/setactiveplan', {
            method:'POST',
            body:JSON.stringify({idPlan:id}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.status === 200){
                console.log('data', data)
                
                let backEndUser = {...this.state.backEndUser}
                const idPlanInTab = backEndUser.allPlans.findIndex(item=>item._id === id)
                if (idPlanInTab >=0){
                    backEndUser.allPlans[idPlanInTab].isValidated = true
                }
                let frontEndUser = {...this.state.frontEndUser}
                if (data.emailSubmitter === frontEndUser.email){
                    const idPlanNotvalidated = frontEndUser.tabPlansNotValidated.findIndex((item)=>item._id == id)
                    let planToBeValidated = {}
                    if (idPlanNotvalidated >=0){
                        planToBeValidated = frontEndUser.tabPlansNotValidated[idPlanNotvalidated]
                        planToBeValidated.isValidated = true
                        frontEndUser.tabPlansValidated.push(planToBeValidated)
                        frontEndUser.tabPlansNotValidated.splice(idPlanNotvalidated, 1)
                    }
                }
                let search = {...this.state.search}
                const idSearchPlan = search.resultsAdministrators.findIndex(item=>item._id == id)
                if(idSearchPlan>=0){
                    search.resultsAdministrators[idSearchPlan].isValidated = true
                }
                this.setState({
                    backEndUser:backEndUser,
                    frontEndUser:frontEndUser,
                    search:search
                })
                
            }
        })
        .catch(err=>console.log(err))

    }

    setNotActivePlan = (id)=>{

    }
    
    setActiveFrontEndUser = (data, history, destination) =>{
        let frontEndUser = {...this.state.frontEndUser}
        let backEndUser = {...this.state.backEndUser}
        let administrators = [...this.state.administrators]
        if ([Role.Administrateur, Role.SuperAdministrateur, Role.Utilisateur].includes(data.role)){
            frontEndUser.connected = true
            frontEndUser.email = data.email
            frontEndUser.role = data.role
            frontEndUser.tabIdPlans = data.tabIdPlans
            frontEndUser.tabPlansValidated = data.tabPlansValidated
            frontEndUser.tabPlansNotValidated = data.tabPlansNotValidated
            frontEndUser.tabPlansSold = data.tabPlansSold
            frontEndUser.percentageToRefill = data.percentageToRefill
        } 
        if ([Role.Administrateur, Role.SuperAdministrateur].includes(data.role)){
            backEndUser.allPlans = data.allPlans
        } 
        if ([Role.SuperAdministrateur].includes(data.role)){
            administrators = data.administrators
        }
        this.setState(()=>{
            return {
                frontEndUser:frontEndUser,
                backEndUser:backEndUser,
                administrators:administrators
            }
    }, ()=>{
        if (destination === 'home'){
            history.push('/administrationfrontend');
          }else if (destination === 'signup'){
            history.push('/cart');
          }else{
              history.push('/');
          }
    });
        /*let action='failure'
        fetch('/api/getFrontEndUserTabIdPlans', {
            method : 'POST',
            body: JSON.stringify({email:email}),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res =>{
            if (res.status === 200){
                action = 'succes'
            }else{
                action = 'failure'
            }
            return res.json()
        })
        .then(data => {
            if (action === 'succes'){
                console.log(data.tabIdPlans)
                let frontEndUser = {...this.state.frontEndUser}
                frontEndUser.connected = true
                frontEndUser.email = email
                frontEndUser.role = role
                frontEndUser.tabIdPlans = data.tabIdPlans
                this.setState(()=>{
                    return {
                        frontEndUser:frontEndUser
                    }
            }, ()=>{
                if (destination === 'home'){
                    history.push('/administrationfrontend');
                  }else if (destination === 'signup'){
                    history.push('/cart');
                  }else{
                      history.push('/');
                  }
            });
            }
            
        })
        .catch(err =>{
            console.log(err)
        })*/
        
    }
    setActiveBackEndUser = (email, history, destination) =>{
        let action='failure'
        fetch('/api/getBackEndUserAllPlans', {
            method : 'POST',
            body: JSON.stringify({email:email}),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res =>{
            if (res.status === 200){
                action = 'succes'
            }else{
                action = 'failure'
            }
            return res.json()
        })
        .then(data => {
            if (action === 'succes'){
                console.log(data.allPlans)
                let backEndUser = {...this.state.backEndUser}
                backEndUser.connected = true
                backEndUser.email = email
                backEndUser.allPlans = data.allPlans
                this.setState(()=>{
                    return {
                        backEndUser:backEndUser
                    }
            }, ()=>{
                
                history.push('/administrationbackend');
                  
            });
            }
            
        })
        .catch(err =>{
            console.log(err)
        })
        
    }
    processPayment = (history, totalPrice)=>{
        let action = ''
        fetch('/checkTokenFrontEnd', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
          .then(res => {
              if (res.status === 401){
                  history.push('/loginfrontend/signup')
                  action='notConnected'
              }else if(res.status === 200){
                  action  = 'connected'
                  return res.json();
                  
              }
              else{
                  console.log(res.status)
                  console.log("Unknow error")
              }
            })
          .then(data =>{
            if (action === 'connected'){
                this.setState(()=>{
                    return {
                        frontEndUser:{
                            connected:true,
                            email: data.email,
                            tabIdPlans:data.tabIdPlans
                        }
                    }
                }, ()=>{
                    history.push('/cart')
                })
            }
          })
          .catch(err=>{
              console.error(err)
          })
    }
    setPlans = () =>{
        let tempPlans = []
        this.state.plansCoupCoeur.forEach(item =>{
            const singleItem = {...item}
            singleItem.inCart = false
            singleItem.count = 0
            singleItem.total = 0
            tempPlans = [...tempPlans, singleItem]
        })
        this.setState(()=>{
            return {plansCoupCoeur:tempPlans}
        })
    }
    getItem = (id) =>{
        const plan = this.state.allPlans.find(item => item._id === id)
        return plan
    }
    handleDetail = (id) =>{
        const product = this.getItem(id) 
        this.setState(()=>{
            return {detailProduct:product}
        })
    }
    addToCart = (id, from) => {
        let numberPlans = this.state.cartTotalNumberPlans + 1

        let added = false;

        let tempPlansCoeur = [...this.state.plansCoupCoeur]
        const indexCoeur = tempPlansCoeur.findIndex(item=>item._id === id)
        if (indexCoeur >= 0){
            const plan = tempPlansCoeur[indexCoeur]
            plan.inCart = true
            plan.count = 1
            const price = plan.price
            plan.total = price
            if (!added){
                this.setState(()=>{
                    
                    return {
                        cartTotalNumberPlans:numberPlans,
                        plansCoupCoeur:tempPlansCoeur, 
                        cart:[...this.state.cart, plan]}
                }, ()=>{
                    added = true
                    this.addTotals()
                })
            }else{
                this.setState(()=>{
                    
                    return {
                        cartTotalNumberPlans:numberPlans,
                        plansCoupCoeur:tempPlansCoeur
                    }
                }, ()=>{
                    this.addTotals()
                })
            }
        }
        let tempPlansSearch = [...this.state.search.results]
        const indexSearch = tempPlansSearch.findIndex(item=>item._id === id)
        if (indexSearch>=0){
            
            const plan = tempPlansSearch[indexSearch]
            plan.inCart = true
            plan.count = 1
            const price = plan.price
            plan.total = price
            if (!added){
                this.setState(()=>{
                    
                    return {
                        cartTotalNumberPlans:numberPlans,
                        search:{results:tempPlansSearch}, 
                        cart:[...this.state.cart, plan]}
                }, ()=>{
                    added = true
                    this.addTotals()
                })
            }else{
                this.setState(()=>{
                    
                    return {
                        cartTotalNumberPlans:numberPlans,
                        search:{results:tempPlansSearch}
                    }
                }, ()=>{
                    this.addTotals()
                })
            }
        }
        let tempPlansPopular = [...this.state.plansPopular]
        const indexPopular = tempPlansPopular.findIndex(item=>item._id === id)
        if (indexPopular >=0){
            
            const plan = tempPlansPopular[indexPopular]
            plan.inCart = true
            plan.count = 1
            const price = plan.price
            plan.total = price
            if (!added){
                this.setState(()=>{
                    return {
                        cartTotalNumberPlans:numberPlans,
                        plansPopular:tempPlansPopular, 
                        cart:[...this.state.cart, plan]}
                }, ()=>{
                    added = true
                    this.addTotals()
                })
            }else{
                this.setState(()=>{
                    return {
                        cartTotalNumberPlans:numberPlans,
                        plansPopular:tempPlansPopular
                    }
                }, ()=>{
                    this.addTotals()
                })
            }
        }
    }
    openModal = (id) => {
        const product = this.getItem(id)
        this.setState(()=>{
            return {modalProduct:product, modalOpen:true}
        })
    }
    closeModal = () => {
        this.setState(()=>{
            return {modalOpen:false}
        })
    }

    decrement = (id) =>{
        let tempCart = [...this.state.cart]
        const selectedPlan = tempCart.find(item=>item._id === id)

        const index = tempCart.indexOf(selectedPlan)
        const plan = tempCart[index];

        plan.count = plan.count - 1
        if (plan.count === 0){
            this.removeItem(id)
        }else{

            plan.total = plan.count * plan.price

            this.setState(()=>{
                return {cart:[...tempCart]}
            }, ()=>{
                this.addTotals()
            })
        }
    }

    increment = (id) =>{
        let tempCart = [...this.state.cart]
        const selectedPlan = tempCart.find(item=>item._id === id)

        const index = tempCart.indexOf(selectedPlan)
        const plan = tempCart[index];

        plan.count = plan.count + 1
        plan.total = plan.count * plan.price

        this.setState(()=>{
            return {cart:[...tempCart]}
        }, ()=>{
            this.addTotals()
        })
    }
    removeItem = (id)=>{
        let tempPlansCoeur = [...this.state.plansCoupCoeur];
        let tempPlansPopular = [...this.state.plansPopular]
        let tempPlansSearch = [...this.state.search.results]
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item._id !== id);

        const indexCoeur = tempPlansCoeur.findIndex(item => item._id === id)
        if (indexCoeur >= 0){
            let removedPlanCoeur = tempPlansCoeur[indexCoeur]
            removedPlanCoeur.inCart = false
            removedPlanCoeur.total = 0
            removedPlanCoeur.count = 0
        }

        const indexPopular = tempPlansPopular.findIndex(item => item._id === id)
        if (indexPopular>=0){
            let removedPlanPopular = tempPlansPopular[indexPopular]
            removedPlanPopular.inCart = false
            removedPlanPopular.total = 0
            removedPlanPopular.count = 0
        }
        
        const indexSearch = tempPlansSearch.findIndex(item => item._id === id)
        if (indexSearch>=0){
            let removedPlanSearch = tempPlansSearch[indexSearch]
            removedPlanSearch.inCart = false
            removedPlanSearch.total = 0
            removedPlanSearch.count = 0
        }


        let numberPlans = this.state.cartTotalNumberPlans - 1
        let search = {...this.state.search}
        search.results = [...tempPlansSearch]
        this.setState(()=>{
            return {
                cart: [...tempCart],
                plansCoupCoeur:[...tempPlansCoeur],
                plansPopular:[...tempPlansPopular],
                search:search,
                cartTotalNumberPlans: numberPlans
            }
        }, ()=>{
            this.addTotals()
        })
    }
    clearCart = () => {
        this.setState(()=>{
            return { 
                    cart:[],
                    cartTotalNumberPlans: 0
                }
        }, ()=>{
            this.setPlans();
            this.addTotals();
        })
    }
    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => (subTotal += item.total))
        const tempTax = 0 // No tax
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    render(){
        return (
            <ApplicationContext.Provider value={{
                ...this.state,
                setSearchAdministratorsPlans:this.setSearchAdministratorsPlans,
                setNotActivePlan:this.setNotActivePlan,
                setActivePlan:this.setActivePlan,
                setResults:this.setResults,
                setAddedPlan:this.setAddedPlan,
                setModifiedPlan:this.setModifiedPlan,
                deconnexion:this.deconnexion,
                savePayments:this.savePayments,
                setActiveFrontEndUser: this.setActiveFrontEndUser,
                setActiveBackEndUser:this.setActiveBackEndUser,
                setDetailPlan: this.setDetailPlan,
                handleDetail:this.handleDetail,
                processPayment:this.processPayment,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                decrement:this.decrement,
                increment:this.increment,
                removeItem:this.removeItem,
                clearCart:this.clearCart
            }}>
                {this.props.children}
            </ApplicationContext.Provider>
        )
    }
}

const ApplicationConsumer = ApplicationContext.Consumer

export {ApplicationProvider, ApplicationConsumer}