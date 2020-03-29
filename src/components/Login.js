
import React from 'react'
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


export default LoginForm;