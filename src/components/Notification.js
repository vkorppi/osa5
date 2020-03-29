import React from 'react'

const Message = ({ text }) => {
	
    if (text === '') {
      return ''
    }
  
    return (
      <p className="message">
        {text}
      </p>
    )
    
    
  }

  export default Message;