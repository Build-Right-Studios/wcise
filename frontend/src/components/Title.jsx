import React, { useState } from 'react'

function Title(props) {
    // const [title, setTitle] = useState('');


  return (
    <div className='text-4xl font-bold text-center my-8 text-[#1d3b58] lg:text-6xl lg:text-right lg:pr-6'>{props.title}</div>
  )
}

export default Title