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
        <Navigation session={this.state.session} onLogout={() => this.setState({ session: null })}/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login redirect={this.state.session} onLogin={session => this.setState({ session })}/>
          </Route>
          <Route path="/restaurant">
            <Restaurant session={this.state.session}/>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
