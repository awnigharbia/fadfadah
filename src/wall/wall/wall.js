import React from 'react'
import {injectIntl} from 'react-intl'
import '../css/Wall.css'
import {Helmet} from 'react-helmet'

//components
import NewPost from '../post/addPost'
import Tags from './tags/'
import Posts from './posts/loadPosts'
import SupportWidget from '../widgets/support'
import MotivatedVideo from '../widgets/Video'
import Trending from '../widgets/trending'

function Wall({intl}) {
  return (
    <>
      <Helmet>
        <title>Wall | Fadfada.com</title>
      </Helmet>
      <Tags />
      <div className="wa">
        <div className="wa-wrapper">
          <div className="center" id="center-wrapper">
            <NewPost />
            <Posts />
          </div>

          <div className="right">
            <Trending />
            <MotivatedVideo />
            <SupportWidget msg={intl.formatMessage({id: 'support.h1'})} />
          </div>
        </div>
      </div>
    </>
  )
}

export default injectIntl(Wall)
