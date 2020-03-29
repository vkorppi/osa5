import React, { useState, useEffect } from 'react'
import Allblogs from './components/List'
import LoginForm from './components/Login'
import NewBlogForm from './components/NewBlog'
import Message from './components/Notification'
import ChangeVisibility from './components/ChangeVisibility'

import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const _ = require('lodash');

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginUrl, setloginUrl] = useState('')
  const [account, setAccount] = useState(null)

  
  
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

  const increaseLikes = async (blogTobemod) => {

    console.log(blogTobemod)

    const updatedBlog= await blogService.update(blogTobemod)

    console.log(updatedBlog)

    var updatedlist = _.remove(blogs, function(blog) {
      return blog.id !== updatedBlog.id;
    });
    
    setBlogs(_.orderBy(updatedlist.concat(updatedBlog), ['likes'], [ 'desc']))
    
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

      console.log(loggedUser)

      setAccount(loggedUser)

      setUsername('')
      setPassword('')
    }
    catch (exception) {
      

      messageref.current.messageHandler(`Login failed`)
              
    }
  }

  const newBlogSubmited = async  (newBlog) => {

    try {
				
	    formref.current.visibilityHandler()
	
      var newblog = await blogService.createNew(newBlog,account)
      messageref.current.messageHandler(`Blog creation successfull`)

      setBlogs(_.orderBy(blogs.concat(newblog), ['likes'], [ 'desc']))
      
    }
    catch (exception) {
		
      messageref.current.messageHandler(`Blog creation failed`)
              

    }
  }



  const fetchBlogList = async  () => {

    const bloglist= await blogService.getAll()

    setBlogs(_.orderBy(bloglist, ['likes'], [ 'desc'])  )
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
        createNewBlog={newBlogSubmited}
      />
</ChangeVisibility>

      <Allblogs content={blogs} loggeduser={account} logoutHandler={endSession} increaseLikes={increaseLikes}/>
      
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