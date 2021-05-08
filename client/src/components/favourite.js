// newly add to /client/src/component

import React, { Component } from "react";
import { handleCRUDButtonSubmit } from './admin-location-create.component'

export default class Favourite extends Component {
    
    render() {
        return (
            <div className="container">
                <div id="form" class="event">
                    <label for="favourite"> List of Favorite Place: </label>
                      <button onClick={() => {
                            let inputList = [this.props.check]
                              handleCRUDButtonSubmit("http://csci2720-g23.cse.cuhk.edu.hk/user/api/favlocation/retrieve", {
                                  "favouritePlace": {$exists:true},
                                  "username": inputList[0]
                              })
                      }}>Refresh</button>
                </div>
                <div id="result">
                </div>
            </div>
        );
    }
}
