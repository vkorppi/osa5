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
  
  
  const formref = React.createRef()
  const messageref = React.createRef()

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

      messageref.current.messageHandler(`User ${loggedUser.name} was authenticated successfully`)
              
      window.localStorage.setItem('UserWithSession', JSON.stringify(loggedUser)      ) 
      setAccount(loggedUser)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      

      messageref.current.messageHandler(`Login failed`)
              
    }
  }

  const newBlogSubmited = async  (event) => {
    
    // Lomake komponenttiin
    event.preventDefault()
    // Lomake komponenttiin

    try {
		
		
	    formref.current.visibilityHandler()
	
      var newblog = await blogService.createNew({"title":title,"author":author,"url":url},account)
      messageref.current.messageHandler(`Blog creation successfull`)

      // Viittauksen kautta
      setBlogs(blogs.concat(newblog))

      // Lomake komponenttiin
      setTitle('')
      setAuthor('')
      setUrl('')
      // Lomake komponenttiin
              
    }
    catch (exception) {
		
    messageref.current.messageHandler(`Blog creation failed`)
              

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

  const fetchBlogList = async  () => {

    const bloglist= await blogService.getAll()
    setBlogs( bloglist )
  }

  useEffect(() => {

    fetchBlogList()

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

    <Message ref={messageref}/>
    
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
    <Message ref={messageref}/>

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