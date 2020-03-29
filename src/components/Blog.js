import React from 'react'
import ChangeVisibility from './ChangeVisibility'

const Blog = ({ blog, increaseLikes}) => {

  const likesHandler = async  (event) => {

   
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

  return (
  <div>

  <div>
    {blog.title} {blog.author}
  </div>

  <ChangeVisibility ref={React.createRef()}>
  <div>
    {blog.url} 
  </div>
  <div>
    {blog.likes} <button onClick={likesHandler}>Like</button>
  </div>
  <div>
    {blog.user.name} 
  </div>
  <div>
  <button>TestButton</button>
  </div>

 
  </ChangeVisibility>

  </div>
)
  }

export default Blog
