import React, { useState } from 'react'
import { dbService, storageService } from 'fBase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newTweet, setNweTweet] = useState(tweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?')
    if(ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete()
      await storageService.refFromURL(tweetObj.attachmentUrl).delete()
    }
  }
  const toggleEditing = () => {
    setEditing(prev => !prev)
  }
  const onChange = (event) => {
    const { target: { value } } = event
    setNweTweet(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(event)
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    })
    setEditing(false)
  }
  return (
    <div className="nweet">
      {editing ? 
        <>
          <form className="container nweetEdit" onSubmit={onSubmit}>
            <input 
              className="formInput"
              type="text"
              required
              autoFocus
              value={newTweet} 
              onChange={onChange}
              placeholder="Edit your Tweet"
            />
            <input className="formBtn" type="submit" value="Update Tweet" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
        :
        <>
          <h4>{tweetObj.text}</h4> 
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} alt='attachment' />}
          {isOwner && (
            <> 
              <div class="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            </> 
          )}
        </>
      }
    </div>
  )
}

export default Tweet