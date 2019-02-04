import React from 'react'

import mapboxgl from 'mapbox-gl'
const mapToken =  process.env.MAPBOX_TOKEN
mapboxgl.accessToken = mapToken
import 'mapbox-gl/dist/mapbox-gl.css'

class Map extends React.Component {

  placeMarker(longitude,latitude,marker){
    new mapboxgl.Marker(marker)
      .setLngLat([longitude,latitude])
      .addTo(this.map)
  }
  componentDidMount(){

    navigator.geolocation.getCurrentPosition(data => {
      const markerElement = document.createElement('DIV')
      markerElement.className = 'custom-marker'
      const {latitude, longitude} = data.coords
      this.placeMarker(longitude,latitude, false)
      this.placeMarker(this.props.location.longitude,this.props.location.latitude, markerElement)
      this.props.bound && this.map.fitBounds([[
        longitude,
        latitude
      ], [
        this.props.location.longitude,
        this.props.location.latitude
      ]],{ padding: 40 })
    })

    if(!this.props.location) return null
    this.map = new mapboxgl.Map({
      container: this.mapDiv,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [this.props.location.longitude,this.props.location.latitude],
      zoom: this.props.zoom
    })

  }

  render() {
    return (
      <div className="map" ref={el => this.mapDiv = el}>
      </div>
    )
  }
}

export default Map
