import React, { useState, useEffect } from 'react'
import Allblogs from './components/List'
import LoginForm from './components/Login'
import NewBlogForm from './components/NewBlog'
import Message from './components/Notification'
import ChangeVisibility from './components/ChangeVisibility'

import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginUrl, setloginUrl] = useState('')
  const [account, setAccount] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')
  
  const formref = React.createRef()

  const usernameChanged = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
  }

  const passwordChanged = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const endSession = (event) => {
    window.localStorage.removeItem('UserWithSession')
    setAccount(null)
  }

  const sendCredentials = async  (event) => {
    event.preventDefault()
    try {

      const loggedUser = await loginService.sendUserCreds({
        username, password,
      })



      setNotification(`User ${loggedUser.name} was authenticated successfully`)
              
      setTimeout(() => {
        setNotification('')
      }, 2000)

      

      window.localStorage.setItem('UserWithSession', JSON.stringify(loggedUser)      ) 
      setAccount(loggedUser)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      

      setNotification(`Login failed`)
              
      setTimeout(() => {
        setNotification('')
      }, 2000)


    }
  }

  const newBlogSubmited = async  (event) => {
    event.preventDefault()
    try {
		
		
	 formref.current.visibilityHandler()
	
      var newblog = await blogService.createNew({"title":title,"author":author,"url":url},account)
      setBlogs(blogs.concat(newblog))

      setNotification(`Blog creation successfull`)
              
      setTimeout(() => {
        setNotification('')
      }, 2000)

		

    }
    catch (exception) {
		
		console.log(exception)

      setNotification(`Blog creation failed`)
              
      setTimeout(() => {
        setNotification('')
      }, 2000)

    }
  }

  const titleChanged = async  (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const authorChanged = async  (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const urlChanged = async  (event) => {
    console.log(event.target.value)
    setUrl(event.target.value)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {   
     const accountJson = window.localStorage.getItem('UserWithSession')  
     accountJson ?  setAccount(JSON.parse(accountJson)) : console.log('No previous session found')
    } 
   ,
    [])

if(account) {
  return (

   
	 
    <>

    <Message text={notification}/>
    
<ChangeVisibility ref={formref}>
    <NewBlogForm 
        title={title}
        author={author}
        url={url}
        newBlogHandler={newBlogSubmited}
        titleHandler={titleChanged}
        authorHandler={authorChanged}
        urlHandler={urlChanged}
      />
</ChangeVisibility>

      <Allblogs content={blogs} loggeduser={account} logoutHandler={endSession}/>
      
    </>
  )
}

  return (
<>
    <Message text={notification}/>

<LoginForm 
        username={username}
        password={password}
        submitHandler={sendCredentials}
        usernameHandler={usernameChanged}
        passwordHandler={passwordChanged}
      />

</>
    )


}

export default App