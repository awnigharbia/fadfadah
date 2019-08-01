import React from 'react'
import ContentLoader from 'react-content-loader'
import _ from 'lodash'
const MyLoader = ({render}) => (
  <>
    {_.times(render, String => {
      return (
        <ContentLoader
          key={String}
          height={200}
          width={600}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#c0c0c0"
        >
          <rect x="100" y="15" rx="4" ry="4" width="117" height="6" />
          <rect x="100" y="35" rx="3" ry="3" width="85" height="6" />
          <rect x="30" y="80" rx="3" ry="3" width="350" height="6" />
          <rect x="30" y="100" rx="3" ry="3" width="380" height="6" />
          <rect x="30" y="120" rx="3" ry="3" width="201" height="6" />
          <circle cx="60" cy="30" r="30" />
        </ContentLoader>
      )
    })}
  </>
)

export default MyLoader
