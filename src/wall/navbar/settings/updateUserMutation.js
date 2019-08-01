import React from 'react'
import gql from 'graphql-tag'

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($property: String!, $value: String!) {
    updateUser(property: $property, value: $value) {
      isUpdated
    }
  }
`
export {UPDATE_USER_MUTATION}
