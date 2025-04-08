import { useDispatch } from 'react-redux'
import { addTrailer } from '../utils/moviesSlice'
import { API_OPTIONS } from '../utils/constants'
import { useEffect } from 'react'

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
    const getMovieTrailer = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?language=en-US', API_OPTIONS)
      const json = await data.json();
  
      const filterData = json.results.filter(video => video.type === 'Trailer');
      const trailer = filterData.length ? filterData[1] : json.results[0];
      dispatch(addTrailer(trailer));
    }

    useEffect(() => {
      getMovieTrailer();
    }, [])
}

export default useMovieTrailer;