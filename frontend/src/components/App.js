import React from 'react';
import './App.css';
import { PENDING, FINISHED, FAILED } from '../util'

export class App extends React.Component {
  constructor() {
    super()
    this.state = { status: PENDING }
  }

  componentDidMount() {
    fetch('/api/locations')
      .then(response => response.json())
      .then(data => this.setState({ status: FINISHED, data }))
      .catch(err => this.setState({ status: FAILED, err }))
  }

  render() {
    switch (this.state.status) {
      case PENDING:
        return <p class="app">Loading...</p>
      case FINISHED:
        return <p class="app">{JSON.stringify(this.state.data)}</p>
      case FAILED:
        return <p class="app">{this.state.err.toString()}</p>
    }
  }
}
