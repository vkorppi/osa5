import React from 'react'
import PropTypes from 'prop-types'
import ChangeVisibility from './ChangeVisibility'

const Blog = ({ blog, increaseLikes,account,removeBlog}) => {


  const likesHandler = async  () => {

   
    const updatedblog = {
      "title": blog.title,
      "author": blog.author,
      "url": blog.url,
      "likes": (blog.likes+1),
      "user": blog.user.id,
      "id": blog.id
    }

    await increaseLikes(updatedblog)

  }

  const removeHandler = async () => {

    if(window.confirm('Are you sure you want to remove this blog')) {
      await removeBlog(blog.id)
    }
  }

  return (
    <div className="blogs">

      <div>
        {blog.title} {blog.author}
      </div>

      <ChangeVisibility ref={React.createRef()}>
        <div>
          {blog.url} 
        </div>
        <div>
          <span className="numberoflikes"> {blog.likes}</span> <button className="likebuttons" onClick={likesHandler}>Like</button>
        </div>
        <div>
          {blog.user.name} 
        </div>
        <div>
          <button className="removeblogs" style={{display:  account.username === blog.user.username ? '' : 'none' }} onClick={removeHandler} >Remove</button>
        </div>

  
 
      </ChangeVisibility>

    </div>
  )
}

Blog.propTypes = {
  
  increaseLikes: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,

}

export default Blog
