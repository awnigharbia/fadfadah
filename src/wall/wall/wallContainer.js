import React, {Component} from 'react'
import gql from 'graphql-tag'

export default class WallContainer extends Component {
  render() {
    return this.props.children
  }
}
