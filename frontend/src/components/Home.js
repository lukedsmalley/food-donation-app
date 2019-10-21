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

  componentDidCatch(err) {
    alert(err)
  }

  render() {
    switch (this.state.status) {
      case FINISHED:
        return <div class="text-center">
          {Object.keys(this.state.data).filter(key => this.state.data[key]).map((key, index) => (
            <iframe key={index} width="800px" height="450px" frameBorder="0" style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?q=place_id:${key}&key=GOOGLE_API_KEY_MUST_GO_HERE`}
              allowFullScreen></iframe> 
          ))}
        </div>
      default:
        return <p>Loading...</p>
    }
  }
}
