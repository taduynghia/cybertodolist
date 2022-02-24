import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Cyberlearn
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mt-2 mt-lg-0 mx-auto">
            <li className="nav-item active">
              <NavLink
                activeClassName="activeNavitem"
                className="nav-link"
                to="/home"
              >
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/detail">
                Detail
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/todolistrcc">
                TodoListRCC
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/todolistrfc">
                TodoListRFC
              </NavLink>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Bài tập
              </a>
              <div
                className="dropdown-menu cursor-pointer"
                aria-labelledby="dropdownId"
              >
                <NavLink className="dropdown-item" to="/todolistrcc">
                  To do list Rcc
                </NavLink>
                <NavLink className="dropdown-item" to="/todolistrfc">
                  To do list rfc
                </NavLink>
                <NavLink className="dropdown-item" to="/todolistredux">
                  To do list redux
                </NavLink>
                <NavLink className="dropdown-item" to="/todolistsaga">
                  To do list saga
                </NavLink>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Header;
