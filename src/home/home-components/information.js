<<<<<<< HEAD
import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import '../../App.css'
import './start.css'

import Link from './myLink'

import fb from '../../imgs/fb.svg'
import inst from '../../imgs/inst.svg'
import tw from '../../imgs/tw.svg'
import translate from '../../imgs/inn.svg'
import en from '../../imgs/english.svg'
import ar from '../../imgs/arabic.svg'

class Information extends Component {
  constructor(props) {
    super(props)
=======
import React, {Component} from 'react';
import { injectIntl } from 'react-intl'
import '../../App.css';
import './start.css';

import Link from './myLink'

import fb from '../../imgs/fb.svg';
import inst from '../../imgs/inst.svg';
import tw from '../../imgs/tw.svg';
import translate from '../../imgs/inn.svg';
import en from '../../imgs/english.svg';
import ar from '../../imgs/arabic.svg';

class Information  extends Component {
  constructor(props) {
    super(props);
>>>>>>> 7ef3fc7f1ae3f3d9b45addb3cf04fac035d03f1c

    this.state = {
      show: false,
    }
  }

  showDropdown = () => {
    if (this.state.show) {
      this.setState({
<<<<<<< HEAD
        show: false,
      })
    } else {
      this.setState({
        show: true,
=======
        show:false
      })
    } else {
      this.setState({
        show:true
>>>>>>> 7ef3fc7f1ae3f3d9b45addb3cf04fac035d03f1c
      })
    }
  }
  render() {
<<<<<<< HEAD
    const intl = this.props.intl
    const show = this.state.show
=======
    const intl = this.props.intl;
    const show = this.state.show;
>>>>>>> 7ef3fc7f1ae3f3d9b45addb3cf04fac035d03f1c

    return (
      <div className="s-right">
        <Link to="eval:void(0)">
          <img src={tw} alt="tw" />
        </Link>
        <Link to="eval:void(0)">
          <img src={inst} alt="inst" />
        </Link>
        <Link to="eval:void(0)">
          <img src={fb} alt="fb" />
        </Link>
        <Link id="contact" to="eval:void(0)">
          {intl.formatMessage({id: 'contact.btn'})}
        </Link>
<<<<<<< HEAD
        <span>|</span>
        <div className="translate" onClick={this.showDropdown}>
          <img src={translate} alt="translate dropdown" />
          &#129171;
          <div
            className="dropdown-content"
            style={{display: show ? 'block' : 'none'}}
          >
            <a
              href="eval:void(0)"
              className="dropdown-link"
              onClick={this.props.changeToEnglish}
            >
              <img src={en} alt={en} />
              English
            </a>
            <a
              href="eval:void(0)"
              className="dropdown-link"
              onClick={this.props.changeToArabic}
            >
              <img src={ar} alt={ar} />
              Arabic
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Information)
=======
      <span>|</span>
      <div className="translate" onClick={this.showDropdown} >
        <img src={translate} alt="translate dropdown" />
        &#129171;
        <div  className="dropdown-content" style={{display:show ? 'block' : 'none'}}>
          <a href="eval:void(0)" className="dropdown-link" onClick={this.props.changeToEnglish}><img src={en} alt={en}/>English</a>
          <a href="eval:void(0)" className="dropdown-link" onClick={this.props.changeToArabic}><img src={ar} alt={ar}/>Arabic</a>
        </div>
      </div>
    </div>
  )
}
}

export default injectIntl(Information)
>>>>>>> 7ef3fc7f1ae3f3d9b45addb3cf04fac035d03f1c
