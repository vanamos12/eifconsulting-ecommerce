import React, { Component } from 'react'
import {sliderImages} from './data'

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
        frontEndUser:{
            connected:false,
            email:''
        },
        backEndUser:{
            connected:false,
            email:''
        },
        cartSubTotal:0,
        cartTotalNumberPlans:0,
        cartTax:0,
        cartTotal:0
    }
    componentDidMount(){
        this.setApplicationPlans()
    }
    setApplicationPlans = () =>{
        fetch('/api/home', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
            .then(res => res.json())
            .then(data => {
                data.plansCoupCoeur.forEach(item=>{
                    item.inCart = false
                    item.count = 0
                    item.total = 0
                })
                this.setState({
                    plansCoupCoeur:data.plansCoupCoeur,
                    sliderImages:sliderImages
                })
            })
            .catch(err => {
                console.error(err);
                alert('Error getting the plans in please try again');
            });
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
    processPayment(history, totalPrice){
        let that = this
        fetch('/checkToken', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
          .then(res => {
              if (res.status === 401){
                  history.push('/loginfrontend')
              }else if(res.status === 200){
                  return res.json();
              }
              else{
                  console.log(res.status)
                  console.log("Unknow error")
              }
            })
          .then(data =>{
            this.setState(()=>{
                return {frontEndUser:{connected:true, email: data.email}}
              }, ()=>{
                history.push('/cart')
              })
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
                products:[...tempPlans],
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