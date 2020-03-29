import React from 'react'
import ChangeVisibility from './ChangeVisibility'

const Blog = ({ blog }) => (
  <div>

  <div>
    {blog.title} {blog.author}
  </div>

  <ChangeVisibility ref={React.createRef()}>
  <div>
    {blog.url} 
  </div>
  <div>
    {blog.likes} 
  </div>
  <div>
    {blog.user.name} 
  </div>
  </ChangeVisibility>

  </div>
)

export default Blog
