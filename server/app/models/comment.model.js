const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    locationId: {type: String, required:true}, 
    userComments:[{body: String, username: String, date: Date}]
  })
);

module.exports = Comment;