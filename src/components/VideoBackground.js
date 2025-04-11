import React from 'react'
import {  useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

const VideoBackground = ({movieId}) => {
  const trailer = useSelector((store) => store.movies.trailer);
  useMovieTrailer(movieId);
  return (
    <div className='md:-m-4'>
      <iframe className="w-screen aspect-video" src={"https://www.youtube.com/embed/" + trailer?.key + "?autoplay=1&mute=1&loop=1&playlist=" + trailer?.key + "&rel=0"} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
    </div>
  )
}

export default VideoBackground
