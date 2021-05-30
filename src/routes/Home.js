import React, { useState, useEffect } from 'react'
import { dbService } from 'fBase'
import Tweet from 'components/Tweet'
import TweetFactory from 'components/TweetFactory'

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([])
   
  // const getTweets = async () => {
  //   const dbTweets = await dbService.collection('tweets').get()
  //   dbTweets.forEach(docu => {
  //     const tweetObject = {
  //       ...docu.data(),
  //       id: docu.id,
  //     }
  //     setTweets(prev => [tweetObject, ...prev])
  //   })
  // }

  useEffect(() => { 
    // db 변화 감지 
    dbService.collection('tweets').onSnapshot(snapshot => {
      const tweetsArray = snapshot.docs.map(doc => ({
        id: doc.id, 
        ...doc.data()
      }))
      setTweets(tweetsArray)
    })
  }, [])

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
       <div style={{ marginTop: 30 }}>
          {tweets.map((tweet) => 
            <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
          )}
      </div>
    </div>
  )
}

export default Home