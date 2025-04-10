import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { NETFLIX_BG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div>
        <img
          src={NETFLIX_BG}
          alt="Netflix Background"
          className="h-full w-full object-cover fixed -z-10"
        />
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-60 -z-10" />
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch
