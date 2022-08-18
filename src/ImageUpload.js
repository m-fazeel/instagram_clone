import { Button } from '@mui/material'
import React, { useState } from 'react'
import { storage, db } from './firebase'
import firebase from "firebase";
import './imageUpload.css'


function ImageUpload({username}) {

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      //Gives the snapshot of the Progress bar as it completes
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      //If there is an error, catch it and show alert
      (error) => {
        console.log(error);
        alert(error);
      },
      () => {
        //complete function
        storage.ref("images").child(image.name).getDownloadURL().then(url => {
          db.collection("posts").add({
            //Timestamp is 
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username,
          });

          setProgress(0);
          setCaption("");
          setImage("");
        })
      }
    )

    
  }

  return (
    <div className='imageUpload'>
      <progress value ={progress} />
      <input
        type="text" placeholder='Enter caption'
        value={caption} onChange={event => setCaption(event.target.value)}></input>

      <input type="file" onChange={handleChange}></input>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload