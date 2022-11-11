let mongoose = require('mongoose')

let createDishSchema = new mongoose.Schema({
    dishName: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true,
  }]

}, {
    timestamps: true,
}
)

module.exports = mongoose.model('receipe', createDishSchema);