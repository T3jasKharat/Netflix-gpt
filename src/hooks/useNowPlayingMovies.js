import { useDispatch, useSelector } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'
import {API_OPTIONS} from '../utils/constants'
import { useEffect } from 'react'

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS);

    const json = await data.json();
    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(() => {
    if(!nowPlayingMovies.length) getNowPlayingMovies();
  }, [])
}

export default useNowPlayingMovies;