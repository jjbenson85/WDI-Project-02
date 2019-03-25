const mongoose = require('mongoose')

const establishmentSchema = new mongoose.Schema({
  BusinessName: { type: String, required: false },
  scores: {
    Hygiene: { type: Number, required: false }
  },
  geocode: {
    longitude: { type: Number, required: false },
    latitude: { type: Number, required: false }
  }
}, {
  id: false
})
//
// establishmentSchema.virtual('tracks', {
//   ref: 'Track',
//   localField: '_id',
//   foreignField: 'establishment'
// })

// establishmentSchema.set('toJSON', {
//   virtuals: true,
//   transform(doc, json) {
//     delete json.__v
//     return json
//   }
// })

module.exports = mongoose.model('Establishment', establishmentSchema)
