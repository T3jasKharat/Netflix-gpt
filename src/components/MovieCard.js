import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return;
  return (
    <div className='w-48 pr-4 hover:cursor-pointer transform transition duration-300 hover:-translate-y-2'>
      <img alt='Movie Card' src={IMG_CDN_URL + posterPath} />
    </div>
  )
}

export default MovieCard
