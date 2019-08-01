import React, {Component} from 'react'
import '../App.css'
import './home-components/start.css'

//Components import
import LoGo from './home-components/logo'
import Intro from './home-components/intro'
import Footer from './home-components/footer'

export default class Start extends Component {
  render() {
    return (
      <div className="s">
        <div className="s-nav">
          <LoGo />
        </div>
        <div className="s-content">
          <Intro />
        </div>
        <div className="s-footer">
          <Footer />
        </div>
      </div>
    )
  }
}
