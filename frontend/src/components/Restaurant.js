import React from 'react'
import { Redirect } from 'react-router-dom'
import { PENDING, FINISHED, FAILED } from '../util'

export class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: PENDING
    }
  }

  componentDidMount() {
    fetch('/api/has-food/' + this.props.session)
      .then(response => {
        if (response.status !== 200) {
          throw null
        } else {
          return response.json()
        }
      })
      .then(hasFood => this.setState({ status: FINISHED, hasFood }))
      .catch(err => this.setState({ status: FAILED, err }))
  }

  onHasFoodChanged() {
    fetch('/api/has-food/' + this.props.session, {
      method: 'POST',
      body: JSON.stringify(!!this.checked)
    })
  }

  render() {
    if (!this.props.session) {
      return <Redirect to="/"/>
    }

    switch (this.state.status) {
      case PENDING:
        return <p style={{ textAlign: 'center' }}>Loading...</p>
      case FAILED:
        return <p style={{ textAlign: 'center' }}>{this.state.err.toString()}</p>
      default:
        return (
          <div className="container">
            <div className="text-center">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="has-food" checked={JSON.stringify(this.state.hasFood)} onChange={this.onHasFoodChanged}/>
                <label className="form-check-label" htmlFor="has-food">We have food</label>
              </div>
            </div>
          </div>
        )
    }
  }
}
