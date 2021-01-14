import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './styles/Movies.scss'
import client from '../../utils/client';

export const Movies = (props) => {

  const [movies, setMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
     client.getEntries({ content_type: 'movie' }).then(res => {
      setMovies(res.items);
    })
  },[])

const toDetails = (movie) => {
    console.log(movie)
      history.push(`details/${movie.sys.id}`)
  }

  return (
    <div className="Movies">
      <div className="Header">
        <h1>Movies</h1>
        <h4
        onClick={() => history.push('/create')}
        >Create Movie</h4>
      </div>
      <div className="Body">
        <div className="Movie">
        {movies.map((movie, index) => (
          <div 
          key={index} 
          className="MovieContainer"
          onClick={() => toDetails(movie)}>      
            <img src={movie.fields.moviecover.fields.file.url} />      
          </div>
        ))}  
        </div>
      </div>
    </div>

  )
};
export default Movies;