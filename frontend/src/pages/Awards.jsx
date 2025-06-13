import React from 'react'
import { Link } from 'react-router-dom'

function Awards() {
  return (
    <div>
      <Link to='/awards-2019'>2019</Link><br />
      <Link to='/awards-2022'>2022</Link><br />
      <Link to='/awards-2023'>2023</Link><br />
    </div>
  )
}

export default Awards
