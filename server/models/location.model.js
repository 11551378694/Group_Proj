const mongoose = require("mongoose");

const Location = mongoose.model(
  "Location",
  new mongoose.Schema({
    locationId: {type: String, required:true}, 
    name:{type: String, required: true},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    userComments:[{body: String, username: String, date: Date}]
  })
);

module.exports = Location;