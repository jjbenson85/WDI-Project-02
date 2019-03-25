require('dotenv').config()

const mongoose = require('mongoose')
const Promise = require('bluebird')

mongoose.Promise = Promise

const Establishment = require('../models/establishment')

const data = require('../fsa_establishment_cro_data')

console.log('data',data)

mongoose.connect(process.env.MONGODB_URI, (err, db) => {
  db.dropDatabase()
    .then(() => {
      return Promise.each(data.establishments, (est)=>{
        return Establishment.create({
          BusinessName: est.BusinessName,
          BusinessType: est.BusinessType,
          BusinessTypeID: est.BusinessTypeID,
          scores: {
            Hygiene: est.scores.Hygiene
          },
          geocode: {
            longitude: est.geocode.longitude,
            latitude: est.geocode.latitude
          }
        })
      })
    })
    // const output =  []
    //
    // data.establishments.forEach((est, i)=>{
    //   console.log(est, i)
    //   return Establishment.create({
    //     BusinessName: 'Jameses',
    //     BusinessType: 'Restaurant',
    //     BusinessTypeID: 1,
    //     scores: {
    //       Hygiene: 5
    //     },
    //     geocode: {
    //       longitude: -0.0984779968857765,
    //       latitude: 51.375545501709
    //     }
    //   })
    //     .then((res)=>{
    //       output.push(res)
    //     })
    //   })
    //
    //
    //   console.log('output',output)
    //   return output
    // })
    .then((data)=> console.log(data))
    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
