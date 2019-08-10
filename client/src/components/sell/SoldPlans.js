import React, {Component} from 'react'

class SoldPlans extends Component{
    render(){
        const tabPlansSold = this.props.value.frontEndUser.tabPlansSold
        const countNbPlansVendus = tabPlansSold.length
        const percentageToRefill = this.props.value.frontEndUser.percentageToRefill
        let priceNbPlansVendus = tabPlansSold.reduce((acc, item)=>acc+item.plan.price, 0)*percentageToRefill
        priceNbPlansVendus = priceNbPlansVendus.toFixed(0)
        return (
            <div className="soldplans">
                <div className="spaceToSee">   
                </div>
                <div className="container text-center informations">
                    <h2>Plans vendus</h2>
                    <h3>Nombre de plans vendus : {countNbPlansVendus}</h3>
                    <h3>Pourcentage &agrave; remettre: {percentageToRefill*100} %</h3>
                    <h3>Montant attendu : {priceNbPlansVendus} FCFA</h3>
                </div>
            </div>
        )
    }
}

export default SoldPlans