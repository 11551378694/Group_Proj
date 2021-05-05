import React, { Component } from "react";

export default class AdminLocationUpdate extends Component {
    render() {
        return (
            <div className="container">
                <form action="http://localhost:8080/admin/api/location/update" method="post">
                    <label for="locationId">locationId: </label>
                    <input name='locationId' />
                    <br />
                    <label for="latitude">latitude: </label>
                    <input name='latitude' />
                    <br />
                    <label for="longitude">longitude: </label>
                    <input name='longitude' />
                    <br />
                    <label for="name">name: </label>
                    <input name='name' />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}