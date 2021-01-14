import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import client from '../../utils/client';
import clientManagement from '../../utils/clientManagement';


export const Details = (props) => {

   const [details, setDetails] = useState();
   const id = props.match.params.id;
   const history = useHistory()

    useEffect(() => {
        client.getEntry(id).then(res => {
          setDetails(res);
        })
      }, [])

  const deleteMovie = () => {
    clientManagement.getSpace('hwcs1bbt6b9l')
    .then((space) => space.getEnvironment('master'))
    .then((env) => env.getEntry(id))
    .then((entry) => entry.unpublish())
    .then((unpublishsed) => unpublishsed.delete())
    .then(() => {
      console.log('Entry deleted')
      history.push('/movies')
    })
    .catch((err) => console.log(err))
  }

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
            <p>Starring: {details.fields.movieactor}</p>
            <p>Director: {details.fields.director}</p>
            <p>{details.fields.moviedescription.content[0].content[0].value}</p>
          </div> 
          <div className="DetailsOptions">
              <div 
              className="DetailsOptionsDelete"
              onClick={deleteMovie}>Delete</div>
          </div>
          </div>
        </div> 
      </div>
      </> }
    </div>

  )
};
export default Details;