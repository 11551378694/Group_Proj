import React, { Component } from "react";
import { handleCRUDButtonSubmit } from './admin-location-create.component'

export default class AdminLocationDelete extends Component {
    render() {
        return (
            <div className="container">
                <div id="form" class="event">
                    <label for="locationId">locationId: </label>
                    <input name='locationId' id="locationId" />
                    <br />
                    <button onClick={() => {
                        let inputList = [document.querySelector("#locationId").value]
                        if (inputList.includes("")) {
                            document.querySelector("#result").innerHTML = "Invalid Input. Try again."
                        } else {
                            handleCRUDButtonSubmit("http://localhost:8080/admin/api/location/delete", {
                                "locationId": inputList[0]
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