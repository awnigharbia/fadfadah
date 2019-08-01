import React, {Component} from 'react'
import { injectIntl } from 'react-intl'
import '../../App.css'
import './start.css'

import Link from './myLink'

class NavItems extends Component {
  render() {
    const intl = this.props.intl
    return (
      <div className="s-links">
        <Link onClick={this.props.features} to="#">{intl.formatMessage({id: 'navitems.features'})}</Link>
        <Link onClick={this.props.download} to="#">{intl.formatMessage({id: 'navitems.download'})}</Link>
        <Link onClick={this.props.scrollBottom} to="#">{intl.formatMessage({id: 'navitems.about'})}</Link>
      </div>
    )
  }
}
  
  
  export default injectIntl(NavItems)