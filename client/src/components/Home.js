import React, {Component} from 'react'
import Slider from './Slider'
import Titre from './Titre'

export default class Home extends Component {
    render() {
      return (
        <React.Fragment>
          <Slider/>
          <Titre titre="Nos coups de coeur"/>
        </React.Fragment>
      );
    }
  }