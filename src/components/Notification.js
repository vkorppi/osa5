import React, { useState, useImperativeHandle  } from 'react'

const Message = React.forwardRef((props, ref)  => {

  const [notification, setNotification] = useState('')


  const messageHandler = (text) => {
    
    setNotification(text)

    setTimeout(() => {
      setNotification('')
    }, 2000)

  }

  useImperativeHandle(ref, () => {

    return { messageHandler  }  
  })
	
  if (notification === '') {
    return ''
  }
  
  return (
    <p className="message">
      {notification}
    </p>
  )
    
    
})

Message.displayName='Message'

export default Message;