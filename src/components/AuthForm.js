import React, { useState } from 'react'
import { authService } from 'fBase'

const AuthForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [newAccount, setNewAccount] = useState(false)

  const toggleAccount = () => setNewAccount(prev=>!prev)
  const onChange = event => {
    const {target: {name, value}} = event
    if(name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async event => {
    event.preventDefault()  
    try {
      let data;
      if(newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email, password
        )
      } else {
        data = await authService.signInWithEmailAndPassword(
          email, password
        )
      }
      console.log(data)
    } catch (error) {
      setError(error.message);
    }
  }
    
  return (
    <>
      <form className="container" onSubmit={onSubmit}>
        <input 
          className="authInput"
          name='email'
          type='text' 
          placeholder='email' 
          required 
          value={email} 
          onChange={onChange} />
        <input 
          className="authInput"
          name='password'
          type='password' 
          placeholder='password' 
          required 
          value={password} 
          onChange={onChange} />
        <input 
          className="authInput authSubmit"
          type='submit' 
          value={newAccount? 'CreateAccount':'SignIn'} />
        {error && <span className="authError">{error}</span>}
      </form>
      <span className="authSwitch" onClick={toggleAccount}>
        {newAccount ? 'SignIn': 'Create Account'}
      </span>
    </>
  )
}

export default AuthForm 