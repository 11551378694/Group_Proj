import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

export default class AdminLocationCreate extends Component {
    render() {
        return (
            <div className="container">
                <form action="http://csci2720-g23.cse.cuhk.edu.hk/admin/location/create" method="post">
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