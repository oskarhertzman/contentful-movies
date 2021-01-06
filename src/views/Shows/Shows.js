import React, { useState, useEffect } from 'react'
import './styles/Shows.scss'
var contentful = require('contentful');


export const Shows = (props) => {

  const [shows, setShows] = useState([]);

  useEffect(() => {
    let client = contentful.createClient({
      space: 'hwcs1bbt6b9l',
      accessToken: 'wW_rDX48N7w8cnGWtdjbJScrOZGaiwKdKoRTIjmfY6Q'
    })
    client.getEntries({ content_type: 'tv' }).then(res => {
      setShows(res.items);
    })
  }, [])

  return (
    <div className="Shows">
      <div className="Header">
        <h1>Shows</h1>
      </div>
      <div className="Body">
        {shows.map((show, index) => (
          <div key={index} className="Movie">
          <h1>{shows.length - index}</h1>
          <div className="MovieContainer">      
          <img src={show.fields.tvcover.fields.file.url} />           
          <div className="MovieInfo">
            <h2>{show.fields.title}</h2>
            <p>Genre: {show.fields.tvgenre}</p>
            <p>Starring: {show.fields.tvactors.map((actor, index) => {
              return `${actor.fields.actorname} `
          })}</p>
            <p>Seasons: {show.fields.tvseasons}</p>
            <p>{show.fields.tvdescription.content[0].content[0].value}</p>
          </div>
          </div>
        </div>
        ))}  
      </div>
    </div>

  )
};
export default Shows;