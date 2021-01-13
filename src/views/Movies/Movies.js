import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './styles/Movies.scss'
var contentful = require('contentful');


export const Movies = (props) => {

  const [client, setClient] = useState();
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setClient(contentful.createClient({
      space: 'hwcs1bbt6b9l',
      accessToken: 'wW_rDX48N7w8cnGWtdjbJScrOZGaiwKdKoRTIjmfY6Q'
    }))
  }, [])

  useEffect(() => {
    client && client.getEntries({ content_type: 'movie' }).then(res => {
      setMovies(res.items);
    })
  },[client])

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