import React, { useState, useEffect } from 'react'
import createEntry from '../../utils/createEntry';
import client from '../../utils/client';
import clientManagement from '../../utils/clientManagement';

export const Create = (props) => {

  const [movie, setMovie] = useState({})




  const publishAsset = () => {

    let fileData = {
      fields: {
        file: {
          'en-US': {
            contentType: 'image/*',
            fileName: 'cover.jpg',
            upload: movie.moviecover
          }
        }
      }
    };

    clientManagement.getSpace('hwcs1bbt6b9l')
      .then((space) => space.getEnvironment('master'))
      .then((environment) => environment.createAsset(fileData))
      .then((asset) => asset.processForAllLocales())
      .then(function (processedAsset) {
        console.log(processedAsset.sys.id)
        processedAsset.publish()
          .then(function (publishedAsset) {
            console.log(publishedAsset);
            createMovie(publishedAsset.sys.id)
          })
      })
      .catch((error) => {
        console.log(error)
      })



  }

  const createMovie = (asset_id) => {
    clientManagement.getSpace('hwcs1bbt6b9l')
      .then((space) => space.getEnvironment('master'))
          .then((environment) => {
            environment.createEntry('movie', {
              linkType: "ContentType",
              id: "movie",
              fields: {
                movietitle: {
                  'en-US': movie.movietitle
                },
                moviecover: {
                  'en-US': {
                    sys: {
                      type: 'Link',
                      linkType: 'Asset',
                      id: asset_id
                    }
                  }
                },
                moviegenre: {
                  'en-US': movie.moviegenre
                },
                movieactor: {
                  'en-US': movie.movieactor
                },
                director: {
                  'en-US': movie.director
                },
                moviedescription: {
                  'en-US': {
                    content: [
                      {
                        nodeType: "paragraph",
                        data: {},
                        content: [
                          {
                            value: movie.moviedescription,
                            nodeType: "text",
                            marks: [],
                            data: {}
                          }
                        ]
                      }
                    ],
                    data: {},
                    nodeType: 'document'
                  }
                },
              }
            })
            .then((entry) => {
              entry.publish();
            }) 
            .catch((error) => {
              console.log(error)
            })
          })  
  }

  console.log(client)
  console.log(movie);

  return (
    <div className="Movies">
      <div className="Header">
        <h1>Add Movie</h1>
      </div>
      <div className="Body">
        <div className="Movie">
          <div className="CreateContainer">

            <div className="CreateInfo">
              <label>Title</label>
              <input
                type="text"
                onChange={(e) => setMovie(prevState => ({ ...prevState, movietitle: e.target.value }))}
              />
              <label>Cover (URL)</label>
              <input
                type="text"
                onChange={(e) => setMovie(prevState => ({ ...prevState, moviecover: e.target.value }))}
              />
              <label>Genre</label>
              <input
                type="text"
                onChange={(e) => setMovie(prevState => ({ ...prevState, moviegenre: e.target.value }))}
              />
              <label>Actors</label>
              <input
                type="text"
                onChange={(e) => setMovie(prevState => ({ ...prevState, movieactor: e.target.value }))}
              />
              <label>Director</label>
              <input
                type="text"
                onChange={(e) => setMovie(prevState => ({ ...prevState, director: e.target.value }))}
              />
              <label>Description</label>
              <textarea
                cols="50" rows="5"
                onChange={(e) => setMovie(prevState => ({ ...prevState, moviedescription: e.target.value }))}
              ></textarea>
            </div>
            <div className="CreateOptions">
              <div
                onClick={() => publishAsset()}
                className="CreateOptionsCreate">Create</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};
export default Create;