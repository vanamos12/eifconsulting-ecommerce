import React, {Component} from 'react'
import EmptySearch from './EmptySearch'
import SearchList from './SearchList'

class SearchResults extends Component{
    render(){
        const results = this.props.value.search.results
        if (results.length === 0){
            return (
                <React.Fragment>
                    {/*<div className="spaceToSee">

                    </div>*/}
                    <EmptySearch/> 
                </React.Fragment>
                )
        }else{
            return (
                <React.Fragment>
                    
                    {/*<div className="spaceToSee">

                    </div>*/}
                    
                    <div className="cart_info">
                        <div className="container">
                            <h1 className="text-center">R&eacute;sultats de la recherche</h1>
                            <SearchList value={this.props.value}/>
                            
                        </div> 
                    </div>
                    
                </React.Fragment>
            )
        }
    }
}

export default SearchResults