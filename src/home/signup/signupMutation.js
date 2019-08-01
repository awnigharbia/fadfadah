import gql from 'graphql-tag'

export const REGISTER_MUTATION = gql`
  mutation registerMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      token
    }
  }
`
