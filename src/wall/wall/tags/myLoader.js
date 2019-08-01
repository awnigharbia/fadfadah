import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = ({color}) => (
  <div className="loading-state">
    <ContentLoader
      width={1000}
      height={30}
      speed={2}
      primaryColor={color}
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="15" ry="15" width="119" height="30" />
      <rect x="130" y="0" rx="15" ry="15" width="119" height="30" />
      <rect x="260" y="0" rx="15" ry="15" width="119" height="30" />
      <rect x="390" y="0" rx="15" ry="15" width="119" height="30" />
      <rect x="520" y="0" rx="15" ry="15" width="119" height="30" />
      <rect x="650" y="0" rx="15" ry="15" width="119" height="30" />
      <rect x="780" y="0" rx="15" ry="15" width="119" height="30" />
    </ContentLoader>
  </div>
)

export default MyLoader
