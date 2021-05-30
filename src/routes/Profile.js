import React,{ useState, useEffect } from 'react'
import { authService, dbService } from 'fBase'
import { useHistory } from 'react-router'


const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory()
  const [newDisplayName, setNeuwDisplayName] = useState(userObj.displayName)

  const onLogoutClick = () => {
    authService.signOut()
    history.push('/')
  }

  const getMyTweets = async () => {
    const tweets = await dbService
    .collection('tweets')
    .where("creatorId", "==", userObj.uid)
    .orderBy("createdAt")
    .get()
    console.log(tweets.docs.map(doc => doc.data()))
  }

  useEffect(() => {
    getMyTweets()
  }, [])

  const onChange = (event) => {
    const { target : { value } } = event
    setNeuwDisplayName(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName
      })
       refreshUser()
    }
  }

  return (
    <div className="container">
      <form className="profileForm" onSubmit={onSubmit}>
        <input 
          className="formInput"
          type='text'
          autoFocus
          placeholder='Display name'
          value={newDisplayName} 
          onChange={onChange} />
        <input 
          className="formBtn"
          style={{
            marginTop: 10,
          }}
          type='submit'
          value="Update Profile" />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  )
}

export default Profile