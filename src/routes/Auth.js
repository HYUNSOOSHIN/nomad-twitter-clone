import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from 'fBase'
import AuthForm from 'components/AuthForm';

const Auth =  () => {
  const onSocilClick = async (event) => {
    const {
      target: {name}
    } = event
    let provider;
    if(name === "google") { 
      provider = new firebaseInstance.default.auth.GoogleAuthProvider()
    } else if(name === "github") {
      provider = new firebaseInstance.default.auth.GithubAuthProvider()
    }

    const data = await authService.signInWithPopup(provider)
    console.log(data)
  }
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button className="authBtn" name="google" onClick={onSocilClick}>
          Continue with google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button className="authBtn" name="github" onClick={onSocilClick}>
          Continue with github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  )
}

export default Auth