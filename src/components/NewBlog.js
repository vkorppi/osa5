
import React, { useState  } from 'react'

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
                    title
                    <input type="text" value={title}  onChange={titleHandler} />
                </div>

                <div>
                    author
                    <input  type="text" value={author} onChange={authorHandler} />
                </div>

                <div>
                    url
                    <input  type="text" value={url} onChange={urlHandler} />
                </div>

                <div>
                    <button type="submit">create</button>
                </div>

            </form>
        </>
    )
}


export default NewBlogForm;