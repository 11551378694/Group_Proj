const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userId: Number,
    username: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    favouritePlace: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location"
      }
     ]
  })
);

module.exports = User;