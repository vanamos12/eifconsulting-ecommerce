import React, {Component, Suspense, lazy} from 'react'
import {sliderDefaultImages} from '../data'
import Titre from './Titre'
import  QualityBox from './QualityBox'
import  Characteristics from './Characteristics'
import  Newletter from './Newletter'
import  Footer from './Footer'
import Search from './Search'

const PlanList = lazy(()=>import('./PlansList')) 
const SliderHooks = lazy(()=>import('./SliderHooks')) 
const Tab = lazy(()=>import('./Tab')) 


export default class Home extends Component {
    render() {
      return (
        <React.Fragment>
          {/* <div className="spaceToSee"></div> */}
          <Suspense fallback={<div>Loading...</div>}>
            <SliderHooks slides={sliderDefaultImages}/>
          </Suspense>
          <Titre titre="Nos coups de coeur"/>
          <Suspense fallback={<div>Loading...</div>}>
            <PlanList/>
          </Suspense>
          <Titre titre="Recherche"/>
          <Search value={this.props.value} history={this.props.history}/>
          <Suspense fallback={<div>Loading...</div>}>
            <Tab/>
          </Suspense>
          <QualityBox/>
          <Characteristics/>
          <Newletter/>
          {/*<Footer/>*/}
        </React.Fragment>
      );
    }
  }