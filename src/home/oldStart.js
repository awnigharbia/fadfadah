import React, {Component} from 'react'
import '../App.css'
import './home-components/start.css'

//React-scroll
import Scroll from 'react-scroll'

//Logo
// import NavLogo from '../imgs/small.png';
// import arrDown from '../imgs/arrDown.svg';

//link
// import Link from './home-components/myLink';

//Components import
import LoGo from './home-components/logo'
import NavItems from './home-components/navItems'
import Information from './home-components/information'
import Shapes from './home-components/shapes'
import Intro from './home-components/intro'

let scroll = Scroll.animateScroll

export default class Start extends Component {
  scrollB = () => {
    scroll.scrollToBottom()
  }

  scrollToFeatures = () => {
    scroll.scrollTo(760)
  }

  scrollToDownload = () => {
    scroll.scrollTo(1850)
  }

  render() {
    return (
      <div className="s">
        <div className="s-nav">
          <div className="s-left">
            <LoGo />
            <NavItems
              scrollBottom={this.scrollB}
              features={this.scrollToFeatures}
              download={this.scrollToDownload}
            />
          </div>
          <Information
            changeToArabic={this.props.changeToArabic}
            changeToEnglish={this.props.changeToEnglish}
          />
        </div>
        <div className="s-content">
          <Shapes />
          <Intro />
        </div>
      </div>
    )
  }
}
