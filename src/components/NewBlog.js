
import React from 'react'
const NewBlogForm   = ({title,author,url,newBlogHandler,titleHandler,authorHandler,urlHandler}) => {
    
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