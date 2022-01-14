import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { GoogleAuthProvider, getAuth,signInWithPopup,GithubAuthProvider,signOut,FacebookAuthProvider } from "firebase/auth";
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();


function App() {
  const [user,setUser]=useState({});

const auth = getAuth();

const signInGoogle=()=>{
  signInWithPopup(auth, googleProvider)
  .then(result=>{
    console.log(result.user);
    const {displayName,email,photoURL} = result.user;
    const loggedInUser={
      name:displayName,
      email:email,
      photo:photoURL
    };
    setUser(loggedInUser);
  })
  .catch(error => {
    console.log(error.message)
  })
  }

  const signInGithub=()=>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user=result.user;
      console.log(user);
      const {displayName,email,photoURL}=user;
      const loggedInUser={
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(loggedInUser);
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  const sugnInFacebook=()=>{
    signInWithPopup(auth,facebookProvider)
    .then(result=>{
      const user=result.user;
      console.log(user);
      const {displayName,email,photoURL}=user;
      const loggedInUser={
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(loggedInUser);
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  const logOut=()=>{
    signOut(auth)
    .then(()=>{
      setUser({});
    })
  }
  return (
    <div className="App">
     {!user.name ? 
     <div>
        <button onClick={signInGoogle}>sign in google</button>
        <button onClick={signInGithub}>Github sign in</button>
        <button onClick={sugnInFacebook}>Facebook sign in</button>
      </div>:
        <button onClick={logOut}>sign out</button>}
      <br /> <br />
        {
          user.name && <div>
            <h2>Welcome {user.name}</h2>
            <p>I know your email address: {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        }
    </div>
  );
}

export default App;
