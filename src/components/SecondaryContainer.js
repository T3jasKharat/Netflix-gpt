import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)
  const popularMovies = useSelector((store) => store.movies.popularMovies)
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)
  if(!nowPlayingMovies.length && !popularMovies.length && !topRatedMovies.length && !upcomingMovies.length) return;
  return (
    <div className=' bg-black'>
      <div className='-mt-52 pl-10 relative z-50'>
        <MovieList title={'Now Playing'} movies={nowPlayingMovies}/>
        <MovieList title={'Popular'} movies={popularMovies}/>
        <MovieList title={'Top Rated'} movies={topRatedMovies}/>
        <MovieList title={'Upcoming Movies'} movies={upcomingMovies}/>
      </div>
    </div>
  )
}

export default SecondaryContainer
