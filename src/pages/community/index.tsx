import React from 'react'
import { Link } from 'react-router-dom'
import YourComponent from './test'

const Community = () => {
  return (
    <div>
      Community
      <Link to='/'>Home으로</Link>
      <YourComponent></YourComponent>
    </div>
  )
}

export default Community
