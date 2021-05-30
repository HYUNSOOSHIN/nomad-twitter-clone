import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { dbService, storageService } from 'fBase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('')
  const [attachment, setAttachment] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    if(tweet === '') return 

    let attachmentUrl = ""
    if(attachment !== "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
      const response = await fileRef.putString(attachment, "data_url")
      attachmentUrl = await response.ref.getDownloadURL()
    }
    await dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    })
    setTweet('')
    setAttachment("")
  }
  const onChagne = (event) => {
    const { target: {value} } =event
    setTweet(value)
  }
  const onFileChange = (event) => {
    const { target: { files } } = event
    const theFile = files[0]
    const reader  = new FileReader()
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result)
    }
    reader.readAsDataURL(theFile)
  }
  const onClearAttachmentClick = () => setAttachment(null)

  return (
    <form className="factoryForm" onSubmit={onSubmit}>
      <div className="factoryInput__container">
        <input 
          className="factoryInput__input"
          type='text' 
          placeholder="What's on your mind?" 
          maxLength={120} 
          value={tweet}
          onChange={onChagne} />
        <input 
          type="submit" 
          value="&rarr;" 
          className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input 
        style={{
            opacity: 0,
        }}
        id="attach-file" 
        type='file'
        accept={'image/*'} 
        onChange={onFileChange} 
      />
      {attachment && 
        <div className="factoryForm__attachment">
          <img 
            style={{
                backgroundImage: attachment,
            }} 
            src={attachment} 
            alt="img" />
          <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      }
    </form>
  )
}

export default TweetFactory