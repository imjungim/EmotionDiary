import React from 'react'
import {Link} from 'react-router-dom';

const RouteTest = () => {
  return (
    <div>
      <Link to={'/'}>HOME</Link>
      <br/>
      <Link to={'/diary'}>Diary</Link>
      <br/>
      <Link to={'/new'}>NEW</Link>
      <br/>
      <Link to={'/edit'}>EDIT</Link>
      
      
    </div>
  )
}

export default RouteTest