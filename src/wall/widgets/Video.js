import React from 'react'
import {Video} from 'grommet-icons'
import {useQuery} from 'react-apollo-hooks'
import gql from 'graphql-tag'

const GET_VIDEO = gql`
  {
    videos {
      link
    }
  }
`

export default function MotivatedVideo() {
  const {link} = useVideo()
  return (
    <div className="video-content">
      <div className="video-content-title">
        <Video size="25px" color="hsl(202, 57%, 15%);" />
        <p>Motivation Video</p>
      </div>
      <iframe
        width="320"
        height="200"
        src={`https://www.youtube.com/embed/${link}`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  )
}

function useVideo() {
  const {loading, error, data} = useQuery(GET_VIDEO)
  if (loading) return <></>
  return {
    link: data.videos[0].link,
  }
}
