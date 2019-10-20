import React from 'react'
import { Link } from 'react-router-dom'

export function Navigation(props) {
  if (props.session) {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link style={{ color: 'inherit' }} to="/">
          <a class="navbar-brand">Food Donation</a>
        </Link>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link style={{ color: 'inherit' }} to="/restaurant">
              <a class="nav-link">Restaurant</a>
            </Link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="btn btn-outline-primary" onClick={props.onLogout}>Logout</a>
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link style={{ color: 'inherit' }} to="/">
          <a class="navbar-brand">Food Donation</a>
        </Link>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link style={{ color: 'inherit' }} to="/login">
              <a class="btn btn-outline-primary">Login</a>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}
