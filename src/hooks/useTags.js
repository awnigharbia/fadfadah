import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo-hooks'
import useDebounce from './useDebounce'

const SEARCH_HASHTAG = gql`
  mutation search($filter: String!, $first: Int!) {
    hashtag(filter: $filter, first: $first) {
      hashtags {
        id
        title
      }
      count
    }
  }
`

export default function useTags(text) {
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const debouncedSearch = useDebounce(text, 700)

  const searchMutation = useMutation(SEARCH_HASHTAG)

  useEffect(() => {
    setTags([])
    setLoading(true)
    if (debouncedSearch.trim() !== '') {
      searchMutation({
        variables: {filter: debouncedSearch, first: 5},
        update: (proxy, data) => {
          setLoading(false)
          setTags(data.data.hashtag.hashtags)
        },
      })
    } else {
      setLoading(false)
      setTags([])
    }
  }, [debouncedSearch])

  return {
    loading,
    tags,
  }
}
