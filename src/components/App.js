import React, { useState, useEffect } from 'react'
import AppRouter from '../components/Router';
import { authService } from 'fBase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(()=> {
    // 로그인/로그아웃 감지하는 관찰자 함수
    authService.onAuthStateChanged((user)=> {
      if(user) {
        setIsLoggedIn(true)
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        })
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    })  
  }

  return (
    <>
      {init? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : 'Initailizing...'}
    </>
  );
}

export default App;
