import React from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  let user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='flex align-middle'>
      <div className='absolute w-44 mx-16 bg-gradient-to-b from-black'>
        <img src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' />
      </div>
      <div>
        {user && <button className='bg-red-500 text-white font-bold absolute right-6 top-5 p-2 rounded-lg' onClick={handleSignOut}>Sign Out</button>}
      </div>
    </div>
  )
}

export default Header
