import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
import { ai } from '../utils/gemini'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movie +'&include_adult=false&language=en-US&page=1', API_OPTIONS);

    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async () => {
    const gptQuery = 'Act as a Movie Recommendation system and suggest some movies for the query: ' + searchText.current.value + '. Only give me names of 5 movies, comma separated like the example result given ahead. Example result: Gadar 2, Sholay, Don, Inside out, Golmaal';
    
    //Make an API call to GPT API and get movie results
    const gptResults = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: gptQuery,
    });
    
    const gptMovies = gptResults.text.split(',')
    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  }

  return (
    <div className='pt-[40%] md:pt-[10%] flex justify-center'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg' onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} className='p-4 m-4 col-span-9 md:col-span-10 rounded-lg' type='text' placeholder={lang[langKey].gptSearchPlaceHolder} />
        <button className='py-2 px-4 col-span-3 md:col-span-2 m-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
