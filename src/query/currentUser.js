import gql from 'graphql-tag'
export const GET_USER = gql`
  {
    userInfo {
      id
      username
      hashtags {
        id
        title
      }
      stories {
        id
        body
      }
      verified
      banned
      language
    }
  }
`
