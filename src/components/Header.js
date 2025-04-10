import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../utils/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { addUser, removeUser } from '../utils/userSlice'
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES, USER_AVTAR } from '../utils/constants'
import { toggleGptSearch } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice'

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {
      // An error happened.
    });
  }

  const handleGptSearch = () => {
    dispatch(toggleGptSearch());
  }

  const handleLangClick = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
      }
    });

    //unsubscribing onAuthStateChanged eventlistener
    return () => unsubscribe();
  }, [])

  return (
    <div className='flex justify-between items-center w-full pr-16 top-5 absolute z-50'>
      <div className='w-44 mx-8'>
        <img src={NETFLIX_LOGO} className='hover:cursor-pointer'/>
      </div>
      {user && <div className='flex items-center'>
        {showGptSearch && <select className='p-2 bg-gray-900 text-white rounded-lg border border-white cursor-pointer' onClick={handleLangClick}>
          {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button onClick={handleGptSearch} className='p-2 mx-4 rounded-lg bg-purple-800 text-white'>{showGptSearch ? 'Go to Home' : 'GPT search'}</button>
        <img src={USER_AVTAR} className='w-8 h-8 rounded-full object-cover mr-4 hover:cursor-pointer'/>
        <button className='bg-red-500 text-white font-bold p-2 rounded-lg' onClick={handleSignOut}>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header
