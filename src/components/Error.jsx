import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Erstyles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Error = () => 
{
  return (
    <>
      <div class="tv-frame">
        <div class="aerial"></div>
        <div class="buttons"></div>
      </div>
      <div class="cont-back">
        <Link className='error_page404__link' to="/">Go Home</Link>
      </div>
    </>
  )
}

export default Error