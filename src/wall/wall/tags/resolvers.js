import gql from 'graphql-tag'
import _ from 'lodash'
import {GET_USER} from '../../../query/currentUser'

const GET_HASHTAGS = gql`
  {
    hashtags {
      id
      title
    }
  }
`

export function updateFollowedHashtags(proxy, data) {
  const {hashtags} = proxy.readQuery({query: GET_HASHTAGS})
  const {userInfo} = proxy.readQuery({query: GET_USER})
  proxy.writeData({
    data: {
      hashtags: _.filter(
        hashtags,
        x => !_.find(data.data.followHashtag.hashtags, x),
      ),
    },
  })
  userInfo.hashtags = data.data.followHashtag.hashtags
  proxy.writeQuery({
    query: GET_USER,
    data: {userInfo: userInfo},
  })
}
