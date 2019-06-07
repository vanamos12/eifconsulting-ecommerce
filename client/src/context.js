import React, { Component } from 'react'
import {sliderImages} from './data'
import Cookies from 'universal-cookie'

const ApplicationContext = React.createContext()

class ApplicationProvider extends Component{

    state={
        plansPopular:[],
        plansCoupCoeur:[],
        detailPlan: {},
        cart:[],
        sliderImages:{},
        modalOpen:false,
        //modalProduct:detailProduct,
        search:{
           results:[] 
        },
        frontEndUser:{
            connected:false,
            email:'',
            tabIdPlans:[]
        },
        backEndUser:{
            connected:false,
            email:'',
            allPlans:[]
        },
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
        frontEndUser.tabIdPlans = []
        let cookies = new Cookies()
        //cookies.set('tokenFrontEnd', 'expired', {maxAge: Date.now(), path:'/', domain:'localhost'})
        //cookies.remove('tokenFrontEnd', {httpOnly: true, path:'/', domain:'localhost'})
        //console.log(cookies.getAll())
        fetch('api/clearCookie')
        .then(res=>{
            if (res.status === 200){
                console.log('cookie cleared')
                this.setState(()=>{
                    return {
                        frontEndUser:frontEndUser
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
        let tabIdPlans = this.state.cart
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
        
        fetch('/api/home', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
            .then(res => {
                console.log(res.status)
                console.log(res.body)
                //console.log(res.text())
                //return res.json()
                return res.text()
            })
            .then(data => {
                
                /*data.plansCoupCoeur.forEach(item=>{
                    item.inCart = false
                    item.count = 0
                    item.total = 0
                })
                
                this.setState(()=>{
                    return {
                        plansCoupCoeur:data.plansCoupCoeur,
                        sliderImages:sliderImages
                    }
                })*/
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
                    this.setState(()=>{
                        return {
                            frontEndUser:{
                                connected:true, 
                                email: data.email,
                                tabIdPlans:data.tabIdPlans
                            }
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
    setActiveFrontEndUser = (email, history, destination) =>{
        let action='failure'
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
                this.setState(()=>{
                    return {
                        frontEndUser:{
                            connected:true,
                            email:email,
                            tabIdPlans:data.tabIdPlans
                        }
                    }
            }, ()=>{
                if (destination === 'home'){
                    history.push('/administrationfrontend');
                  }else if (destination === 'signup'){
                    history.push('/cart');
                  }
            });
            }
            
        })
        .catch(err =>{
            console.log(err)
        })
        
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
        const plan = this.state.plansCoupCoeur.find(item => item._id === id)
        return plan
    }
    handleDetail = (id) =>{
        const product = this.getItem(id) 
        this.setState(()=>{
            return {detailProduct:product}
        })
    }
    addToCart = id => {
        let numberPlans = this.state.cartTotalNumberPlans + 1
        let tempPlans = [...this.state.plansCoupCoeur]
        const index = tempPlans.indexOf(this.getItem(id))
        const plan = tempPlans[index]
        plan.inCart = true
        plan.count = 1
        const price = plan.price
        plan.total = price
        this.setState(()=>{
            return {
                cartTotalNumberPlans:numberPlans,
                plansCoupCoeur:tempPlans, 
                cart:[...this.state.cart, plan]}
        }, ()=>{
            this.addTotals()
        })
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
        let tempPlans = [...this.state.plansCoupCoeur];
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item._id !== id);

        const index = tempPlans.indexOf(this.getItem(id))
        let removedPlan = tempPlans[index]
        removedPlan.inCart = false
        removedPlan.total = 0
        removedPlan.count = 0

        let numberPlans = this.state.cartTotalNumberPlans - 1

        this.setState(()=>{
            return {
                cart: [...tempCart],
                plansCoupCoeur:[...tempPlans],
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
                setResults:this.setResults,
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