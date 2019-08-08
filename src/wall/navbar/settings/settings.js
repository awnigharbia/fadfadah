import React, {Component} from 'react'
import '../../css/Wall.css'
import {Helmet} from 'react-helmet'

//components
import General from './general'
import Password from './password'
import Notification from './notification'
import Languages from './languages'

export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      settings: [
        {id: 0, name: 'General', active: true},
        {id: 1, name: 'Notification', active: false},
        {id: 2, name: 'Password', active: false},
        {id: 3, name: 'Languages', active: false},
      ],
    }
  }

  toggleActive = item => {
    const {settings} = this.state
    var newState = Object.assign({}, this.state)
    newState = newState.settings.slice()
    newState[0].active = false
    newState[1].active = false
    newState[2].active = false
    newState[3].active = false
    this.setState({newState})

    this.setState({
      settings: [
        ...settings.map(x => {
          if (x.id === item.id) {
            return {
              id: item.id,
              name: item.name,
              src: item.src,
              active: true,
            }
          }
          return x
        }),
      ],
    })
  }

  render() {
    const {settings} = this.state
    const {lang, setShow} = this.props

    return (
      <div onClick={e => this.props.hideSetting(e)} className="modal">
        <Helmet>
          <title>Settings | Fadfada.com</title>
        </Helmet>
        <div className="modal-content">
          <div className="left">
            <ul>
              {settings.map((item, key) => (
                <li
                  key={key}
                  onClick={() => this.toggleActive(item)}
                  className={item.active ? 'activeli' : ''}
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="right">
            <General show={settings[0].active} hide={this.props.hideSettings} />
            <Notification show={settings[1].active} hide={this.hideSettings} />
            <Password
              show={settings[2].active}
              hide={this.props.hideSettings}
            />
            <Languages
              changeToArabic={this.props.changeToArabic}
              changeToEnglish={this.props.changeToEnglish}
              show={settings[3].active}
              lang={lang}
            />
          </div>
        </div>
      </div>
    )
  }
}
