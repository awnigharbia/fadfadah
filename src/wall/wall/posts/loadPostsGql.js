import React from 'react'
import gql from 'graphql-tag'

const NEW_FOLLOWED_STORIES = gql`
  subscription {
    newFollowedStory {
      id
      body
      likes {
        likedBy {
          id
        }
      }
      comments {
        id
        body
      }
    }
  }
`

const GET_POSTS = gql`
  query storyQuery($filter: [String]!, $first: Int!, $skip: Int!) {
    storyWithHashtags(
      filter: $filter
      orderBy: id_DESC
      first: $first
      skip: $skip
    ) {
      stories {
        id
        body
        likes {
          id
          likedBy {
            id
          }
        }
        comments {
          id
          body
        }
      }
    }
  }
`

export {NEW_FOLLOWED_STORIES, GET_POSTS}
