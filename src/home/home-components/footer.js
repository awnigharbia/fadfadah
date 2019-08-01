import React, {useState} from 'react'
import {Facebook, Twitter, Github, Instagram} from 'grommet-icons'

export default function Footer() {
  const date = new Date()

  return (
    <div className="footer">
      <div className="footer-copyright">
        <p>{[<span>&copy;</span>, `${date.getFullYear()} Fadfadah.com`]}</p>
      </div>
      <div className="footer-social">
        <Icon IconComponent={Facebook} />
        <Icon IconComponent={Twitter} />
        <Icon IconComponent={Github} />
        <Icon IconComponent={Instagram} />
      </div>
    </div>
  )
}

function Icon({IconComponent}) {
  const [isHover, setIsHover] = useState(false)
  function handleHover() {
    setIsHover(!isHover)
  }

  return (
    <IconComponent
      size="16px"
      color={isHover ? 'plain' : ' gray'}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    />
  )
}
