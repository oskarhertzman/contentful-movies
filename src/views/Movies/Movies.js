import React, { useState, useEffect } from 'react'
import './styles/Movies.scss'
var contentful = require('contentful');


export const Movies = (props) => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let client = contentful.createClient({
      space: 'hwcs1bbt6b9l',
      accessToken: 'wW_rDX48N7w8cnGWtdjbJScrOZGaiwKdKoRTIjmfY6Q'
    })
    client.getEntries({ content_type: 'movie' }).then(res => {
      setMovies(res.items);
    })
  }, [])
  return (
    <div className="Movies">
      <div className="Header">
        <h1>Movies</h1>
      </div>
      <div className="Body">
        {movies.map((movie, index) => (
          <div key={index} className="Movie">
          <h1>{movies.length - index}</h1>
          <div className="MovieContainer">      
            <img src={movie.fields.moviecover.fields.file.url} />   
          <div className="MovieInfo">
            <h2>{movie.fields.movietitle}</h2>
            <p>Genre: {movie.fields.moviegenre}</p>
            <p>Starring: {movie.fields.movieactors.map((actor, index) => {
              return `${actor.fields.actorname} `
          })}</p>
            <p>Director: {movie.fields.moviedirector[0].fields.directorname}</p>
            <p>{movie.fields.moviedescription.content[0].content[0].value}</p>
          </div>
          </div>
        </div>
        ))}  
      </div>
    </div>

  )
};
export default Movies;