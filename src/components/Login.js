
import React from 'react'
import PropTypes from 'prop-types'
const LoginForm   = ({username,password,submitHandler,usernameHandler,passwordHandler}) => {
    
  return (
  
    <>
      <form  onSubmit={submitHandler}>
                
        <div>
                    Username
          <input type="text" value={username}  onChange={usernameHandler} />
        </div>

        <div>
                    Password
          <input  type="password" value={password} onChange={passwordHandler} />
        </div>

        <div>
          <button type="submit">login</button>
        </div>

      </form>
    </>
  )
}

LoginForm.propTypes = {

  passwordHandler: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,

}


export default LoginForm;