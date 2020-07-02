import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./TopBar.scss";

class TopBar extends Component {
  render() {
    return (
      <div className="topBar">
        <div className="menuContainer">
          <div className="item">
            <Link to="/">Home</Link>
          </div>
          <div className="item">
            <Link to="/userList">User List</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
