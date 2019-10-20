import React from 'react'
import { Link } from 'react-router-dom'

export function Navigation(props) {
  if (props.session) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" style={{ color: 'inherit' }} to="/">Food Donation</Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" style={{ color: 'inherit' }} to="/restaurant">Restaurant</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="btn btn-outline-primary" onClick={props.onLogout}>Logout</a>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" style={{ color: 'inherit' }} to="/">Food Donation</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="btn btn-outline-primary" style={{ color: 'inherit' }} to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
