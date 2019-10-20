import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './Home'
import { Restaurant } from './Restaurant'
import { Login } from './Login'
import { Navigation } from './Navigation'

export class App extends React.Component {
  constructor() {
    super()
    this.state = {
      session: null
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Navigation session={this.props.session} onLogout={() => this.setState({ session: null })}/>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/restaurant">
            <Restaurant session={this.props.session}/>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
