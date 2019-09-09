import React, {Component} from 'react'
import { numberItemsPerPage } from '../data'
import {Link} from 'react-router-dom'

class Pagination extends Component{
    pages = (plans)=>{
        const length = plans.length
        let tabPages = []
        let count = 0
        let numberCount = 0
        while(numberCount <= length){
            numberCount += numberItemsPerPage
            count += 1
            tabPages.push(count)
        }
        return tabPages
    }
    render(){
        const tabPages = this.pages(this.props.plans)
        const paginates = tabPages.map(item=><button key={item} className="btn btn-outline-info"><Link to={{pathname:`${this.props.link}/${item}`, state:{}}}>{item}</Link></button>)
        return (
            <div className="pagination">
                {paginates}
            </div>
        )
    }
}

export default Pagination