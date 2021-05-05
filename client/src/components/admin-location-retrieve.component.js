import React, { Component } from "react";

export default class AdminLocationRetrieve extends Component {
    render() {
        return (
            <div className="container">
                <form action="http://localhost:8080/admin/api/location/retrieve" method="post">
                    <label for="locationId">locationId: </label>
                    <input name='locationId' />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}