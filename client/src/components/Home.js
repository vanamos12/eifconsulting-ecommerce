import React, {Component} from 'react'
import Slider from './Slider'
import Titre from './Titre'
import PlanList from './PlansList'
import Search from './Search'
import SliderHooks from './SliderHooks'
import Tab from './Tab'
import {sliderDefaultImages} from '../data'

export default class Home extends Component {
    render() {
      return (
        <React.Fragment>
          <Slider/>
          <SliderHooks slides={sliderDefaultImages}/>
          <Titre titre="Nos coups de coeur"/>
          <PlanList/>
          <Titre titre="Recherche"/>
          <Search value={this.props.value} history={this.props.history}/>
          <Tab/>
        </React.Fragment>
      );
    }
  }