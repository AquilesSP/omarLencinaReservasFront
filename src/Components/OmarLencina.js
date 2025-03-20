import React from 'react'
import { isMobile } from 'react-device-detect'

export default function OmarLencina() {

  if(isMobile){
    return null
  }

  return (
    <article className='OmarLencina'>
      <a href="https://www.linkedin.com/in/omar-lencina-9ab7b5a0/">
        <img src="https://media.licdn.com/dms/image/v2/C4E03AQEmBsbTT2ZeSA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1568911045353?e=1747872000&v=beta&t=73Le2R3LVbIOK9Rv_V1mllsXA1RZKHnScatuNJbIY68" alt="OmarLenicna" />
      </a>
      <h1>Omar Lencina</h1>
      <span>Full Stack Developer</span>
      <p>2025</p>
    </article>
  )
}
