import React, { Component } from "react";
import handleCRUDButtonSubmit from './admin-location-create.component'

export default class AdminUserRetrieve extends Component {
    render() {
        return (
            <div className="container">
                <div id="form" class="event">
                    <label for="userId">userId: </label>
                    <input name='userId' id="userId" />
                    <br />
                    <button onClick={() => {
                        let inputList = [document.querySelector("#userId").value]
                        if (inputList.includes("")) {
                            document.querySelector("#result").innerHTML = "Invalid Input. Try again."
                        } else {
                            handleCRUDButtonSubmit("http://localhost:8080/admin/api/user/retrieve", {
                                "userId": inputList[0],
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