import React, { useRef, useState } from 'react';
import Header from './Header';
import { isValid } from '../utils/validate';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSignIn = () => {
    setSignIn(!signIn);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let message = isValid(emailRef.current.value, passwordRef.current.value);
    setErrorMsg(message);
    if(message) return;

    if(!signIn) {
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocIfPnqc3SWVPI2Ss7FnV3eS48fSdC9xRfeKd9w03ZKYpma5hyQT=s360-c-no'
        }).then(() => {
          // Profile updated!
          const {uid, email, displayName, photoURL} = auth.currentUser;
                  dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate('/browse');
        }).catch((error) => {
          setErrorMsg(error.message)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + '-' + errorMessage);
      });
    } else {
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const {uid, email, displayName, photoURL} = user;
                  dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        console.log(user);
        navigate('/browse');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + '-' + errorMessage)
      });
    }
  }  

  return (
    <div className="relative h-screen w-full">
      <div className="relative z-50">
        <Header />
      </div>

      {/* Background Image */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg"
        alt="Netflix Background"
        className="h-full w-full object-cover"
      />

      {/* Overlay: covers the entire parent, dark background, semi-transparent */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black bg-opacity-60 text-white px-8 py-6 rounded-lg">
        <h1 className="font-bold text-3xl my-6">
          {signIn ? 'Sign In' : 'Sign Up'}
        </h1>

        {/* If signIn is false, show Full Name input */}
        {!signIn && (
          <input
            ref={name}
            className="w-full bg-gray-900 my-2 p-4 rounded-lg border border-white"
            type="text"
            placeholder="Full Name"
          />
        )}

        <input
          ref={emailRef}
          className="w-full bg-gray-900 my-4 p-4 rounded-lg border border-white"
          type="text"
          placeholder="Email or Phone Number"
        />
        <input
          ref={passwordRef}
          className="w-full bg-gray-900 my-4 p-4 rounded-lg border border-white"
          type="password"
          placeholder="Password"
        />
        <p className='text-lg text-red-500 font-bold'>{errorMsg}</p>
        <button className="w-full bg-red-700 my-4 p-4 rounded-lg font-bold">Sign In</button>

        {signIn ? (
          <p className="text-white my-4">
            New to Netflix?
            <span className="font-bold cursor-pointer" onClick={handleSignIn}>
              {' '}Sign Up now.
            </span>
          </p>
        ) : (
          <p className="text-white my-4">
            Already have an account?
            <span className="font-bold cursor-pointer" onClick={handleSignIn}>
              {' '}Sign In now.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
