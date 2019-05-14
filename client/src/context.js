import React, { Component } from 'react'
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

const ApplicationContext = React.createContext()

class ApplicationProvider extends Component{
    state={
        plansPopular:[],
        plansCoupCoeur:[],
        //detailProduct: detailProduct,
        cart:[],
        modalOpen:false,
        //modalProduct:detailProduct,
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
                this.setState({plansCoupCoeur:data.plansCoupCoeur})
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
        console.log(index)
        console.log(id)
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
        const selectedProduct = tempCart.find(item=>item.id === id)

        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index];

        product.count = product.count - 1
        if (product.count === 0){
            this.removeItem(id)
        }else{

            product.total = product.count * product.price

            this.setState(()=>{
                return {cart:[...tempCart]}
            }, ()=>{
                this.addTotals()
            })
        }
    }

    increment = (id) =>{
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item=>item.id === id)

        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index];

        product.count = product.count + 1
        product.total = product.count * product.price

        this.setState(()=>{
            return {cart:[...tempCart]}
        }, ()=>{
            this.addTotals()
        })
    }
    removeItem = (id)=>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false
        removedProduct.total = 0
        removedProduct.count = 0

        this.setState(()=>{
            return {
                cart: [...tempCart],
                products:[...tempProducts]
            }
        }, ()=>{
            this.addTotals()
        })
    }
    clearCart = () => {
        this.setState(()=>{
            return { cart:[]}
        }, ()=>{
            this.setProducts();
            this.addTotals();
        })
    }
    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => (subTotal += item.total))
        const tempTax = subTotal // No tax
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
                handleDetail:this.handleDetail,
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