import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

export default class AdminUserDelete extends Component {
    render() {
        return (
            <div className="container">
                <form action="http://csci2720-g23.cse.cuhk.edu.hk/admin/user/delete" method="post">
                    <label for="userId">userId: </label>
                    <input name='userId' />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}