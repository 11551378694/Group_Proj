import React, { Component } from "react";
import { handleCRUDButtonSubmit } from './admin-location-create.component'

export default class AdminLocationUpdate extends Component {
    render() {
        return (
            <div className="container">
                <div id="form" class="event">
                    <label for="locationId">locationId: </label>
                    <input name='locationId' id="locationId" />
                    <br />
                    <label for="latitude">latitude: </label>
                    <input name='latitude' id="latitude" />
                    <br />
                    <label for="longitude">longitude: </label>
                    <input name='longitude' id="longitude" />
                    <br />
                    <label for="name">name: </label>
                    <input name='name' id="name" />
                    <br />
                    <button onClick={() => {
                        let inputList = [document.querySelector("#locationId").value, document.querySelector("#latitude").value, document.querySelector("#longitude").value, document.querySelector("#name").value]
                        if (inputList[0] === "") {
                            document.querySelector("#result").innerHTML = "Invalid Input. Try again."
                        } else {
                            handleCRUDButtonSubmit("http://localhost:8080/admin/api/location/update", {
                                "locationId": inputList[0],
                                "latitude": inputList[1],
                                "longitude": inputList[2],
                                "name": inputList[3],
                            })
                        }
                    }}>Submit</button>
                </div>
                <div id="result">
                </div>
            </div>
        );
    }
}