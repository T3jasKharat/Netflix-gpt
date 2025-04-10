import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
  const movieResults = useSelector(store => store.gpt.movieResults);
  const movieNames = useSelector(store => store.gpt.movieNames);
  if(!movieNames) return;
  return (
    <div className='bg-black p-4 m-4 bg-opacity-50'>
      <div>
        {movieNames.map((movie, index) => <MovieList key={movie} title={movie} movies={movieResults[index]} />)}
      </div>
    </div>
  )
}

export default GptMovieSuggestions
