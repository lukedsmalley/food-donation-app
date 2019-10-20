import React from 'react'
import { Redirect } from 'react-router-dom'

export class Restaurant extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  render() {
    if (!this.props.session) {
      return <Redirect to="/"/>
    }

    return <p>Restaurant</p>
  }
}
