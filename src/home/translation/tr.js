import React, {Component} from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import En from 'react-intl/locale-data/en'
import Ar from 'react-intl/locale-data/ar'
import { flattenMessages } from './utils'
import messages from './messages'
import App from '../../App'

addLocaleData([...En,...Ar])

let local = 
    (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US'

// split the language 
var language = local.split('-').shift();

export default class HomeTr extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            language:language,
        }
    }
    changeToEnglish = () => {
        if( this.state.language === 'en') {
            return;
        } else {
            this.setState({
                language:'en'           
            })
        }
    }
    changeToArabic = () => {
        if( this.state.language === 'ar') {
            return;
        } else {
            this.setState({
                language:'ar'           
            })
        }
    }
    render() {
        const language =  this.state.language
        return (
            <div>
                <IntlProvider locale={language} messages={flattenMessages(messages[language])}>
                    <App 
                        changeToArabic={this.changeToArabic}
                        changeToEnglish={this.changeToEnglish}
                    />
                </IntlProvider>
          </div>
        )
    }
  }
  