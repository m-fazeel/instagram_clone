import React, { useEffect, useState } from 'react'
import './App.css';
import { db, auth } from './firebase'
import Post from './Post';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleClose = () => { setOpen(false); }
  const handleOpen = () => setOpen(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //User logged in
        console.log(authUser);
        setUser(authUser);
      }
      else {
        //user logged out
        setUser(null);
      }
    })
  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);


  // Sign Up function
  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
    setOpen(false);

  }
  // Sign In function
  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="App">

      {/* ImageUpload */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div>

            <form className='app_signup' action="">
              <center>

                <img
                  className='header_image'
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
                  alt="" />
              </center>

              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type='submit' onClick={signUp}>Sign Up</Button>
            </form>

          </div>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <div>

            <form className='app_signin' action="">
              <center>

                <img
                  className='header_image'
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
                  alt="" />
              </center>

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type='submit' onClick={signIn}>Sign In</Button>
            </form>

          </div>
        </Box>
      </Modal>


      {/* Header of the page */}
      <div className="app_header">
        <img
          className='header_image'
          src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
          alt="" />

        {/* Sign Up button on homepage */}
        {/* user is the person who signed in */}
        {user ? (
          <Button id='btn_logout'  onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app_login">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>

          </div>
        )}
      </div>

      <div className='app_posts'>
        {/* Mapping the posts to their ID */}
        {
          posts.map(({ id, post }) => (
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }

      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName}></ImageUpload>

      ) : (
        <h4>Sorry you need to login to upload</h4>
      )}



    </div>
  );
}

export default App;





