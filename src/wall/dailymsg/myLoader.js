import React from 'react'
import ContentLoader from 'react-content-loader'
import _ from 'lodash'

const MyLoader = ({i}) => (
  <>
    {_.times(i, key => (
      <ContentLoader
        key={key}
        height={70}
        width={800}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#c0c0c0"
      >
        <rect x="30%" y="15" rx="4" ry="4" width="400" height="6" />
        <rect x="30%" y="35" rx="3" ry="3" width="350" height="6" />
        <circle cx="25%" cy="30" r="25" />
      </ContentLoader>
    ))}
  </>
)

export default MyLoader
