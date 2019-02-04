import React from 'react'

import axios from 'axios'

const zomatoKey = process.env.ZOMATO_USER_KEY

import PlacesCard from './PlacesCard'
import Loader from '../common/Loader'

class PlacesIndex extends React.Component{
  constructor(){
    super()

    this.state = {
      pageNumber: 0,
      fsa: [],
      zomato: [],
      places: null,
      location: null
    }
  }

  // Combining Zomato and FSA data to create a filter list of Zomato establishments with FSA rating.
  combineData(){
    const zomato = [...this.state.zomato]
    //Zomato data filtered to only return restaurants that match business name in FSA data
    const filteredZomato = zomato.filter(zomatoPlace => {
      let zName = zomatoPlace.restaurant.name
      zName =  zName.toLowerCase()
        .split(' and ').join('')
        .split('-').join('')
        .split('\'').join('')
        .split('the ').join('')
        .split('&').join('')
        .split(' ').join('')

      // matches places that are included in both the fsa and zomato data
      const fsaPlace = this.state.fsa.filter(place => {
        const fsaName = place.BusinessName
        if(fsaName) return fsaName.includes(zName)
      })

      // if match found
      if(fsaPlace[0]){
        const rating = fsaPlace[0].RatingValue
        // Adding FSA rating to Zomato Places array
        zomatoPlace.restaurant['fsa_rating']=rating
        return true
      }
    })

    // new array created containing only information required for page
    const places = filteredZomato.map(place => {
      return {
        name: place.restaurant.name,
        featured_image: place.restaurant.featured_image,
        location: place.restaurant.location,
        menu_url: place.restaurant.menu_url,
        price_range: place.restaurant.price_range,
        user_rating: place.restaurant.user_rating,
        fsa_rating: place.restaurant.fsa_rating,
        id: place.restaurant.R.res_id,
        cuisines: place.restaurant.cuisines
      }
    })
    this.setState({ places })
  }

  getFSA(lat, lon){
    axios
      .get(`http://api.ratings.food.gov.uk/Establishments/?maxDistanceLimit=1&longitude=${lon}&latitude=${lat}&BusinessTypeId=1&sortOptionKey=distance&pageSize=150`, {headers: {accept: 'application/json', 'x-api-version': 2}})
      .then( res => {
        // mapping over res to change BusinessName to lower case and removing 'and'
        const newFsa = res.data.establishments.map(est => {
          const BusinessName = est.BusinessName.toLowerCase()
            .split(' and ').join('')
            .split('the ').join('')
            .split('-').join('')
            .split('\'').join('')
            .split('&').join('')
            .split(' ').join('')

          const newEst = {...est, BusinessName}

          return newEst
        })

        // if(this.state.pageNumber < 4) {
        //   let pageNumber = this.state.pageNumber
        //   pageNumber++
        //   this.setState({pageNumber: pageNumber})
        //   console.log('newFsa', newFsa)
        //   this.getFSA(lat, lon)
        // }

        const fsa = [...this.state.fsa, ...newFsa]

        this.setState({ fsa } )
        if(this.state.zomato) this.combineData()
      })
  }

  getZomato(lat, lon, i) {
    axios
      .get(`https://developers.zomato.com/api/v2.1/search?entity_type=subzone&lat=${lat}&lon=${lon}&radius=1000&sort=real_distance&start=${i}`, {headers: {'Content-Type': 'application/json', 'user-key': zomatoKey}})
      .then( res => {
        const newZomato = res.data.restaurants
        const zomato = [...this.state.zomato, ...newZomato]
        this.setState({ zomato })
        if(this.state.fsa) this.combineData()
      })
  }

  getApis(lat,lon){

    // for(let i=0;i<10;i++){
    this.getFSA(lat,lon)
    // }

    for(let i=0;i<100; i+=20){
      this.getZomato(lat, lon, i)
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(data => {
      const {latitude, longitude} = data.coords
      this.getApis(latitude,longitude)
      localStorage.setItem('latitude',latitude)
      localStorage.setItem('longitude',longitude)
    })

    // const testCoords = [
    //   {lat: 51.515481300000005,lon: -0.07251969999999999},
    //   {lat: 52.515481300000005,lon: -0.07251969999999999},
    //   {lat: 53.1002700,lon: -2.3941500}
    //   {lat: 51.3761630,lon: -0.0982340}
    //   {lat: 53.4807590,lon: -2.2426310}
    // ]
    // const {lat, lon} = testCoords[0]
    // this.getApis(lat,lon)
    // const {lat, lon} = this.state.location
  }

  render(){
    if(!this.state.places) return <Loader />
    return(
      <div className="container">
        <div className="section index-section">
          <div className="columns scroll">
            {this.state.places.map((place, i) =>
              <div key={i} className="column is-full">
                <PlacesCard  {...place} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PlacesIndex
