import React, {Component} from 'react'
import Plan from '../Plan'

class SearchList extends Component{
    render(){
        const results = this.props.value.search.results
        const plans = results.map((plan)=><Plan key={plan._id} plan={plan} from="search" />)
        return (
            <React.Fragment>
                
                <div className="products">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="product_grid2"> 
                                    {plans}
                                </div> 
                            </div>
                        </div>
                    </div>
		        </div>
            </React.Fragment>
        )
    }
}

export default SearchList