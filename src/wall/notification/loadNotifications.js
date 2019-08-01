import React, {useState} from 'react'
import {useQuery} from 'react-apollo'
import gql from 'graphql-tag'
import InfiniteScroll from 'react-infinite-scroller'
import NotificationItem from './notificationItem'
import MyLoader from '../dailymsg/myLoader'
import _ from 'lodash'

const NOTIFICATION_QUERY = gql`
  query notifications($first: Int!, $skip: Int!) {
    notifications(first: $first, skip: $skip) {
      notification {
        id
        code
        seen
        story {
          id
        }
      }
      count
    }
  }
`

export default function LoaderNotifications() {
  const [hasMore, setHasMore] = useState(true)
  const {loading, error, data, fetchMore} = useQuery(NOTIFICATION_QUERY, {
    variables: {first: 20, skip: 0},
  })
  if (error) return <div>Something went wrong!</div>
  if (loading) return <MyLoader i={5} />

  function handleInfiniteScroll() {
    if (loading) {
      return
    }

    return fetchMore({
      variables: {
        first: 5,
        skip: data.notifications.notification.length,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (_.isEmpty(fetchMoreResult.notifications.notification)) {
          setHasMore(false)
          return prev
        }
        return Object.assign({}, prev, {
          notifications: {
            __typename: prev.notifications.__typename,
            notification: [
              ...prev.notifications.notification,
              ...fetchMoreResult.notifications.notification,
            ],
            count: prev.notifications.count,
          },
        })
      },
    })
  }

  return (
    <InfiniteScroll
      pageStart={0}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '70%',
        minHeight: '500px',
      }}
      loadMore={handleInfiniteScroll}
      hasMore={hasMore}
      loader={<MyLoader i={3} />}
    >
      <ul>
        {data.notifications.notification.map(item => (
          <NotificationItem
            key={item.id}
            postId={item.story.id}
            text={
              item.code === '0'
                ? 'Somebody motivate your post'
                : 'Somebody Commented on your post'
            }
          />
        ))}
      </ul>
    </InfiniteScroll>
  )
}
