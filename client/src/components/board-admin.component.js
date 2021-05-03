import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <p>User CRUD</p>
          <ul>
            <li><Link to="/register">Create User</Link></li>
            <li><Link to="/admin/user/retrieve">Retrieve username</Link></li>
            <li><Link to="/admin/user/update">Update user</Link></li>
            <li><Link to="/admin/user/delete">Delete user</Link></li>
          </ul>
          <p>Place CRUD</p>
          <ul>
            <li><Link to="/admin/location/create">Create Place</Link></li>
            <li><Link to="/admin/location/retrieve">Retrieve place</Link></li>
            <li><Link to="/admin/location/update">Update place</Link></li>
            <li><Link to="/admin/location/delete">Delete place</Link></li>
          </ul>
        </header>
      </div>
    );
  }
}