
import React, { useState, useImperativeHandle  } from 'react'

const ChangeVisibility = React.forwardRef((props, ref)  => {

    const [visible, setVisible] = useState('none')
    const [buttonText, setButtonText] = useState('Show more')
  

    const labelMore='Show more'
    const labelLess='Show less'
  
    const visibilityHandler = () => {

      visible === '' ? setVisible('none') : setVisible('')
      buttonText === labelMore ? setButtonText(labelLess) : setButtonText(labelMore)

    }
	
	useImperativeHandle(ref, () => {

		return { visibilityHandler  }  
		  
	})
  
    return (
      <div>
        <div style={{display: visible }}>
          {props.children}       
        </div>
        <button onClick={visibilityHandler}>{buttonText}</button>
      </div>
    )
  })

  export default ChangeVisibility;