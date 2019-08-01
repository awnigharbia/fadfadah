import React from 'react'
import '../../css/Wall.css'
import Hashtags from './loadingHashtags'
import Search from './search'
import MyHashtags from './myHashtags'

export default function Tags() {
  return (
    <div className="tags">
      <div className="tabContent">
        <Hashtags />
      </div>
      <Search />
      <MyHashtags />
    </div>
  )
}
