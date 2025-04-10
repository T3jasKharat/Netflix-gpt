import { useDispatch, useSelector } from 'react-redux'
import { addTrailer } from '../utils/moviesSlice'
import { API_OPTIONS } from '../utils/constants'
import { useEffect } from 'react'

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector(store => store.movies.trailer);

  const getMovieTrailer = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', API_OPTIONS)
    const json = await data.json();
  
    const filterData = json.results.filter(video => video.type === 'Trailer');
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailer(trailer));
  }

  useEffect(() => {
    if(!trailer) getMovieTrailer();
  }, [])
}

export default useMovieTrailer;