const mongoose = require("mongoose");

const Destination = mongoose.model(
  "Destination",
  new mongoose.Schema({
    destinationId: {type: String, required:true},
    name: {type: String, required: true}
  })
);

module.exports = Destination;