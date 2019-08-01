import React, {Component} from 'react'
import {IntlProvider, addLocaleData} from 'react-intl'
import En from 'react-intl/locale-data/en'
import Ar from 'react-intl/locale-data/ar'
import {flattenMessages} from './utils'
import messages from './messages'
import Container from '../container'
import Auth from '../../auth'

addLocaleData([...En, ...Ar])

let local =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US'

// split the language
var localLang = local.split('-').shift()

export default class WallTr extends Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 'en',
      setLang: '',
    }
  }
  changeToEnglish = () => {
    if (this.state.language === 'en') {
      return
    } else {
      // UPDATE the DATABASE
      fetch('http://localhost:3001/lang', {
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          auth: Auth.getToken(),
        },
        body: `lang=en`,
      }).then(res => {
        if (res.status === 200) {
          this.setState({
            language: 'en',
            setLang: 'en',
          })
        }
      })
    }
  }
  changeToArabic = () => {
    if (this.state.language === 'ar') {
      return
    } else {
      // UPDATE the DATABASE
      fetch('http://localhost:3001/lang', {
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          auth: Auth.getToken(),
        },
        body: `lang=ar`,
      }).then(res => {
        if (res.status === 200) {
          this.setState({
            language: 'ar',
            setLang: 'ar',
          })
        }
      })
    }
  }
  setLang = async () => {
    const getUserInfo = await fetch('http://localhost:3001/user', {
      headers: {
        auth: Auth.getToken(),
      },
    })
    const userInfo = await getUserInfo.json()
    if (userInfo.user.lang === 'new') {
      await fetch('http://localhost:3001/lang', {
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          auth: Auth.getToken(),
        },
        body: `lang=${localLang}`,
      })
    } else {
      await this.setState({
        language: userInfo.user.lang,
        setLang: userInfo.user.lang,
      })
    }
  }
  componentDidMount() {
    // this.setLang();
  }
  render() {
    const {language, setLang} = this.state

    return (
      <div>
        <IntlProvider
          locale={language}
          messages={flattenMessages(messages[language])}
        >
          <Container
            changeToArabic={this.changeToArabic}
            changeToEnglish={this.changeToEnglish}
            lang={setLang}
          />
        </IntlProvider>
      </div>
    )
  }
}
