import React from 'react'
import {useSubscription} from 'react-apollo-hooks'
import {useQuery} from 'react-apollo'
import Post from '../../post/post'
import _ from 'lodash'
import MyLoader from './myLoader'
import {useSetState} from '../../../hooks/useSetState'
import InfiniteScroll from 'react-infinite-scroller'
import {GET_POSTS, NEW_FOLLOWED_STORIES} from './loadPostsGql'
import withContext from '../../../hooks/useAuthenticatedUser'

function LoadPosts({user}) {
  const [state, setState] = useSetState({
    newStories: [],
    stories: [],
    showMore: false,
    hasMore: true,
    newStoriesLength: 0,
    first: 5,
    skip: 0,
  })
  const {id, hashtags} = user

  const {loading, error, data, fetchMore} = useQuery(GET_POSTS, {
    variables: {
      filter: _.map(hashtags, x => x.title),
      first: state.first,
      skip: state.skip,
    },
    onCompleted: data => setState({stories: data.storyWithHashtags.stories}),
  })

  useSubscription(NEW_FOLLOWED_STORIES, {
    onSubscriptionData: ({client, subscriptionData}) => {
      setState({
        newStories: [
          subscriptionData.data.newFollowedStory,
          ...state.newStories,
        ],
        showMore: true,
        newStoriesLength: state.newStoriesLength + 1,
      })
    },
  })

  function handleReset() {
    setState({showMore: false, newStoriesLength: 0})
  }

  function handleInfiniteScroll() {
    if (loading) {
      return
    }

    return fetchMore({
      variables: {
        first: 5,
        skip: data.storyWithHashtags.stories.length,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (_.isEmpty(fetchMoreResult.storyWithHashtags.stories)) {
          setState({hasMore: false})
          return prev
        }
        return Object.assign({}, prev, {
          storyWithHashtags: {
            __typename: prev.storyWithHashtags.__typename,
            stories: [
              ...prev.storyWithHashtags.stories,
              ...fetchMoreResult.storyWithHashtags.stories,
            ],
          },
        })
      },
    })
  }

  if (loading) return <MyLoader render={3} />
  if (error) return <div>Something went wrong!</div>

  return (
    <InfiniteScroll
      pageStart={0}
      style={{width: '520px'}}
      loadMore={handleInfiniteScroll}
      hasMore={!_.isEmpty(state.stories) && state.hasMore}
      loader={<MyLoader render={1} />}
    >
      <div className="posts">
        {state.showMore && (
          <ShowMore onClick={handleReset} length={state.newStoriesLength} />
        )}

        {!state.showMore && !_.isEmpty(state.newStories) && (
          <RenderPosts data={state.newStories} user={id} />
        )}

        <RenderPosts data={data.storyWithHashtags.stories} user={id} />
      </div>
    </InfiniteScroll>
  )
}

function ShowMore({onClick, length}) {
  return <div onClick={onClick} id="show-more">{`${length} new Stories `}</div>
}

function RenderPosts({data, user}) {
  return data.map(i => (
    <Post
      key={i.id}
      id={i.id}
      motivate={_.find(i.likes, {likedBy: {id: user}}) ? true : false}
      text={i.body}
      comments={i.comments}
      likes={i.likes}
    />
  ))
}

export default withContext(LoadPosts)
