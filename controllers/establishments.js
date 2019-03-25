const rp = require('request-promise')

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
}

module.exports = {
  index: indexRoute
}
