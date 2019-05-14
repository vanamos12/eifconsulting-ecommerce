import React, {Component} from 'react'
import Slider from './Slider'
import Titre from './Titre'
import PlanList from './PlansList'

export default class Home extends Component {
    render() {
      return (
        <React.Fragment>
          <Slider/>
          <Titre titre="Nos coups de coeur"/>
          <PlanList/>
          <Titre titre="Recherche"/>
        </React.Fragment>
      );
    }
  }