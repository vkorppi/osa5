
import React, { useState  } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm   = ({createNewBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const titleHandler = async  (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }
    
  const authorHandler = async  (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }
    
  const urlHandler = async  (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }

  const newBlogHandler = async  (event) => {
    event.preventDefault()

    createNewBlog({"title":title,"author":author,"url":url})

    setTitle('')
    setAuthor('')
    setUrl('')
       
  }
    
  return (
  
    <>
      <form  onSubmit={newBlogHandler}>
                
        <div>
                    
          <input type="text" id="title" value={title}  onChange={titleHandler} />
        </div>

        <div>
                    
          <input  type="text" id="author" value={author} onChange={authorHandler} />
        </div>

        <div>
                    
          <input  type="text" id="url" value={url} onChange={urlHandler} />
        </div>

        <div>
          <button type="submit">create</button>
        </div>

      </form>
    </>
  )
}

/*
NewBlogForm.propTypes = {
  titleHandler: PropTypes.func.isRequired,
  authorHandler: PropTypes.func.isRequired,
  urlHandler: PropTypes.func.isRequired,
  createNewBlog: PropTypes.func.isRequired,
  newBlogHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
*/



export default NewBlogForm;