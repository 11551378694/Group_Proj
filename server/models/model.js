const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = mongoose.Schema({
    userId: {type: Number, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favouritePlace: [{ type: ObjectId, ref: 'Location' }]
});

var LocationSchema = mongoose.Schema({
    name:{type: String, required: true},
    LatAndLong:{type: String, require: true},
    userComments:[{body: String, username: ObjectId, ref:'User', date: Date}]
})

module.exports(User, Location);

var User = mongoose.model('User', UserSchema);
var Location = mongoose.model('Location', LocationSchema);