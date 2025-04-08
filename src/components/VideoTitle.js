import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-14 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='w-1/4 my-8'>{overview}</p>
      <div>
        <button className='w-28 p-2 bg-white rounded-lg text-black hover:bg-opacity-80'>▶ Play</button>
        <button className='w-28 mx-4 p-2 bg-gray-500 bg-opacity-30 rounded-lg hover:bg-opacity-80'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
