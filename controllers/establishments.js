const rp = require('request-promise')
const Establishments = require('../models/establishment')


function indexRoute(req, res) {
  const { longitude, latitude} = req.query
  const options = {
    uri: 'http://api.ratings.food.gov.uk/Establishments',
    qs: {
      maxDistanceLimit: 1,
      longitude: longitude,
      latitude: latitude,
      BusinessTypeId: 1,
      sortOptionKey: 'distance',
      pageSize: 150

    },
    headers: {
      accept: 'application/json', 'x-api-version': 2
    },
    json: true
  }

  rp.get(options)
    .then(data => res.json(data))
    // let { longitude, latitude} = req.query
  // // const select = fields ? fields.split(',') : []
  // console.log('indexRoute ', longitude, latitude)
  // latitude = parseFloat(latitude)
  // longitude = parseFloat(longitude)
  //
  // Establishments
  //   .find()
  //   .where('geocode.latitude').gt(latitude-0.1).lt(latitude+0.1)
  //   .where('geocode.longitude').gt(longitude-0.1).lt(longitude+0.1)
  //   .then(establishments => res.json(establishments))
}

function showRoute(req, res) {
  Establishments
    .findById(req.params.id)
    .then(establishment => res.json(establishment))
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
