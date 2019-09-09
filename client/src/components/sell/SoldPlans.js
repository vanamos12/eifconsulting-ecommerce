import React, {Component} from 'react'

class SoldPlans extends Component{
    render(){
        let tabPlansSold = this.props.value.frontEndUser.tabPlansSold
        
        if (this.props.type=="search"){
            tabPlansSold = this.props.value.search.resultsSold
        }
        const countNbPlansVendus = tabPlansSold.length
        const percentageToRefill = this.props.value.frontEndUser.percentageToRefill
        let priceNbPlansVendus = tabPlansSold.reduce((acc, item)=>acc+item.plan.price, 0)*percentageToRefill
        priceNbPlansVendus = priceNbPlansVendus.toFixed(0)

        if (tabPlansSold.length === 0){
            return (
                <div className="soldplans">
                    {
                        this.props.type === "search"
                        ?
                        null
                        :
                        <div className="spaceToSee">   
                        </div>
                    }
                    
                    <div className="container text-center informations">
                        <h2>Aucun plan vendu</h2>
                    </div>
                </div>
            )
        }else {
            return (
                <div className="soldplans">
                    {/*
                        this.props.type === "search"
                        ?
                        null
                        :
                        <div className="spaceToSee">   
                        </div>*/
                    }
                    
                    <div className="container text-center informations">
                        <h2>Plans vendus.</h2>
                        <h3>Nombre de plans vendus : {countNbPlansVendus}</h3>
                        <h3>Pourcentage &agrave; remettre: {percentageToRefill*100} %</h3>
                        <h3>Montant attendu : {priceNbPlansVendus} FCFA</h3>
                    </div>
                </div>
            )
        }
    }
}

export default SoldPlans