import React, { Component } from "react";
import handleCRUDButtonSubmit from './admin-location-create.component'

export default class AdminUserUpdate extends Component {
    render() {
        return (
            <div className="container">
                <div id="form" class="event">
                    <p>Please don't leave blank in any input fields!!</p>
                    <label for="userId">userId: </label>
                    <input name='userId' id='userId' />
                    <br />
                    <label for="username">username: </label>
                    <input name='username' id='username' />
                    <br />
                    <label for="password">password: </label>
                    <input name='password' id='password' />
                    <br />
                    <button onClick={() => {
                        let inputList = [document.querySelector("#userId").value, document.querySelector("#username").value, document.querySelector("#password").value]
                        if (inputList[0] === "") {
                            document.querySelector("#result").innerHTML = "Invalid Input. Try again."
                        } else {
                            handleCRUDButtonSubmit("http://localhost:8080/admin/api/user/update", {
                                "userId": inputList[0],
                                "username": inputList[1],
                                "password": inputList[2],
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