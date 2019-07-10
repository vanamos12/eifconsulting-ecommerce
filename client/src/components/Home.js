import React, {Component, Suspense, lazy} from 'react'
import Titre from './Titre'
import PlanList from './PlansList'
import Search from './Search'
import SliderHooks from './SliderHooks'
import Tab from './Tab'
import QualityBox from './QualityBox'
import Characteristics from './Characteristics'
import Newletter from './Newletter'
import Footer from './Footer'
import {sliderDefaultImages} from '../data'

export default class Home extends Component {
    render() {
      return (
        <React.Fragment>
          <div className="spaceToSee"></div>
          <SliderHooks slides={sliderDefaultImages}/>
          <Titre titre="Nos coups de coeur"/>
          <PlanList/>
          <Titre titre="Recherche"/>
          <Search value={this.props.value} history={this.props.history}/>
          <Tab/>
          <QualityBox/>
          <Characteristics/>
          <Newletter/>
          <Footer/>
        </React.Fragment>
      );
    }
  }