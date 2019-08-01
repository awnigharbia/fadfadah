import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = () => (
  <ContentLoader
    height={400}
    width={470}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#c0c0c0"
  >
    <rect x="25" y="15" rx="5" ry="5" width="420" height="30" />
    <rect x="25" y="95" rx="5" ry="5" width="420" height="30" />
    <rect x="25" y="175" rx="5" ry="5" width="420" height="30" />
    <rect x="25" y="255" rx="5" ry="5" width="420" height="30" />
    <rect x="25" y="335" rx="5" ry="5" width="420" height="30" />
  </ContentLoader>
)

export default MyLoader
