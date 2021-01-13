import React, { useState, useEffect } from 'react'
var contentful = require('contentful');


export const Details = (props) => {

   const [details, setDetails] = useState();
   const id = props.match.params.id;

    useEffect(() => {
        let client = contentful.createClient({
          space: 'hwcs1bbt6b9l',
          accessToken: 'wW_rDX48N7w8cnGWtdjbJScrOZGaiwKdKoRTIjmfY6Q'
        })
        client.getEntry(id).then(res => {
          setDetails(res);
        })
      }, [])

      console.log(details)
  return (
    <div className="Movies">
       { details && 
       <>
       <div className="Header">
        <h1>{details.fields.movietitle}</h1>
      </div>
      
      <div className="Body">
        <div className="Movie">
        <div className="DetailsContainer">  
            <img src={details.fields.moviecover.fields.file.url} />     
            <div className="DetailsInfo">
            <p>Genre: {details.fields.moviegenre}</p>
            <p>Starring: {details.fields.movieactors.map((actor, index) => {
              return `${actor.fields.actorname} `
          })}</p>
            <p>Director: {details.fields.moviedirector[0].fields.directorname}</p>
            <p>{details.fields.moviedescription.content[0].content[0].value}</p>
          </div> 
          <div className="DetailsOptions">
              <div className="DetailsOptionsDelete">Delete</div>
          </div>
          </div>
        </div> 
      </div>
      </> }
    </div>

  )
};
export default Details;