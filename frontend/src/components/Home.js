import React from 'react'
import { PENDING, FINISHED, FAILED } from '../util'

export class Home extends React.Component {
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
      case FINISHED:
        return <p>{JSON.stringify(this.state.data)}</p>
      default:
        return <p>Doink</p>
    }
  }
}
