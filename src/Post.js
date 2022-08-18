import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import { db } from './firebase'
import firebase from "firebase";
import Stack from '@mui/material/Stack';



function Post({ user, postId, username, caption, imageUrl }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    //Getting comments from specific post
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 3) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
           
            children: (`${name.split(' ')[0][0]}`),
        }; 
    }

    return (
        <div className='post'>
            <div className='post_header'>
                {/* Avatar */}
                {/* <Avatar
                className='post_avatar'
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg" /> */}
                <Stack direction="row" spacing={2}>
                    <Avatar {...stringAvatar(username)}  />
                </Stack> 
                {/* Header -> image with the name  */}
                <h3>{username}</h3>
            </div>


            {/* iamge */}
            <img className='image_post' src={imageUrl}
                alt="" />

            {/* username and caption */}
            <h4 className='text_post'><strong>{username}</strong> {caption}</h4>

            {/* Showing comments on post */}
            <div className="post_comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}  </strong>
                        {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                // Comment box and post button
                <form className='comment_form'>
                    <input type="text" className='postInput' placeholder='Add comment' value={comment} onChange={(e) => setComment(e.target.value)} />

                    <button className="post_button" type='submit' disabled={!comment} onClick={postComment}>
                        Post

                    </button>
                </form>
            )}



        </div>
    )
}

export default Post