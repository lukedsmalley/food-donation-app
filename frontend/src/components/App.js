import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './home'

export class App {
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
            <Home session={this.props.session}/>
          </Route>
          <Route path="/login">
            <Login session={this.props.session}/>
          </Route>
          <Route path="/restaurant">
            <Restaurant session={this.props.session}/>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
