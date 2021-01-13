import React, { useState, useEffect } from 'react'
var contentful = require('contentful');


export const Create = (props) => {

    useEffect(() => {
        let client = contentful.createClient({
          space: 'hwcs1bbt6b9l',
          accessToken: 'wW_rDX48N7w8cnGWtdjbJScrOZGaiwKdKoRTIjmfY6Q'
        })
      }, [])

  return (
    <div className="Movies">
       <div className="Header">
        <h1>Add Movie</h1>
      </div> 
      <div className="Body">
        <div className="Movie">
        <div className="DetailsContainer">  
            
            <div className="CreateInfo">
            <label>Title</label>
            <input type="text" />
            <label>Genre</label>
            <input type="text" />
            <label>Actors</label>
            <input type="text" />
            <label>Director</label>
            <input type="text" />
            <label>Description</label>
            <textarea  cols="50" rows="5"></textarea>
          </div> 
          <div className="DetailsOptions">
              <div className="DetailsOptionsCreate">Create</div>
          </div>
          </div>
        </div> 
      </div>
    </div>

  )
};
export default Create;