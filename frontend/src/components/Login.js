import React from 'react'
import { PENDING, FINISHED, FAILED } from '../util'

export class Login extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div class="text-center">
        <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>
        <label for="email" class="sr-only">Email address</label>
        <input type="email" id="email" class="form-control" placeholder="Email address" required autofocus/>
        <label for="password" class="sr-only">Password</label>
        <input type="password" id="password" class="form-control" placeholder="Password" required/>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </div>
    )
  }
}
