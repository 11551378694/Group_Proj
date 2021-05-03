import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

export default class AdminUserUpdate extends Component {
    render() {
        return (
            <div className="container">
                <form action="http://csci2720-g23.cse.cuhk.edu.hk/admin/user/update" method="post">
                    <label for="userId">userId: </label>
                    <input name='userId' />
                    <br />
                    <label for="username">username: </label>
                    <input name='username' />
                    <br />
                    <label for="password">password: </label>
                    <input name='password' />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}