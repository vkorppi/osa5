
import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Allblogs   = ({content,loggeduser,logoutHandler,increaseLikes,account,removeBlog}) => {


  return (
    <div>
      <h2>blogs</h2>
      <div>User name: {loggeduser.name}</div>
      <div> <button onClick={logoutHandler}>logout</button></div>
      <br></br>
      {content.map(blog =>

        <>
          <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} account={account} removeBlog={removeBlog}/>
        
        </>
      )}
    </div>
  )
}

Allblogs.propTypes = {

  removeBlog: PropTypes.func.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  logoutHandler: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  loggeduser: PropTypes.object.isRequired


}


export default Allblogs;