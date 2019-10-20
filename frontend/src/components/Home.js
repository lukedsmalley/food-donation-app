import React from 'react'
import { PENDING, FINISHED, FAILED } from '../util'

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: PENDING }
  }

  componentDidMount() {
    fetch('/api/locations')
      .then(response => response.json())
      .then(data => this.setState({ status: FINISHED, data }))
      .catch(err => this.setState({ status: FAILED, err }))
  }

  render() {
    if (this.props.user)
  }
}
