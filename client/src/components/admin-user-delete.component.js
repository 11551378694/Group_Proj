import React, { Component } from "react";

export default class AdminUserDelete extends Component {
    render() {
        return (
            <div className="container">
                <form action="http://localhost:8080/admin/api/user/delete" method="post">
                    <label for="userId">userId: </label>
                    <input name='userId' />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}