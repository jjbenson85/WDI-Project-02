import React from 'react'

import { Link } from 'react-router-dom'

import Map from './places/Map'

class Home extends React.Component{
  constructor(){
    super()

    this.state = {
      location: null
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(data => {
      const {latitude, longitude} = data.coords
      console.log('lat',latitude, 'lon', longitude)
      this.setState({location: {latitude, longitude}})
    })
  }

  render(){

    return(
      <div className="container">
        <div className="home-section">
          <div className="home">
            <div className="home-left-pane">
              <h1 className="health-tasty">Health<br />&<br />Tasty!</h1>

              <h2 className="title is-3">Search for tasty food from the cleanest restaurants!</h2>
              <Link to="/places" className="button">Search</Link>
            </div>
            {this.state.location && <Map
              location={this.state.location}
              zoom="15"
              bound={false}
            />}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
