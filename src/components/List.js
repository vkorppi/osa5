
import React from 'react'
import Blog from './Blog'

const Allblogs   = ({content,loggeduser,logoutHandler}) => {


  return (
    <div>
      <h2>blogs</h2>
      <div>User name: {loggeduser.name}</div>
      <div> <button onClick={logoutHandler}>logout</button></div>
      <br></br>
      {content.map(blog =>

        <Blog key={blog.id} blog={blog} />
        
      )}
    </div>
  )
}

  export default Allblogs;