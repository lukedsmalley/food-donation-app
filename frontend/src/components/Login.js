import React from 'react'
import { Redirect } from 'react-router-dom'
import './Login.css'

export class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  login() {
    alert(document.querySelector('#email').value)
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
      })
    })
      .then(response => {
        if (response.status != 200) {
          throw 'Invalid credentials'
        } else {
          return response.json()
        }
      })
      .then(session => {
        this.props.onLogin(session)
      })
      .catch(alert)
  }

  render() {
    if (this.props.redirect) {
      return <Redirect to="/restaurant"/>
    }
    //<form className="form-signin"></form>
    return (
      <div className="container">
        <div className="text-center">
          
            <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input type="email" id="email" className="form-control" placeholder="Email address" required autoFocus/>
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Password" required/>
            <button className="btn btn-lg btn-primary btn-block" onClick={this.login}>Sign in</button>
          
        </div>
      </div>
    )
  }
}
