import React from 'react'
import './Login.css'

export class Login extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div class="container">
        <div class="text-center">
          <form class="form-signin">
            <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
            <label for="email" class="sr-only">Email address</label>
            <input type="email" id="email" class="form-control" placeholder="Email address" required autofocus/>
            <label for="password" class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required/>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    )
  }
}
