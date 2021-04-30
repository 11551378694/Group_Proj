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
    locationId: {type: String, required:true}, 
    name:{type: String, required: true},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    userComments:[{body: String, username: ObjectId, ref:'User', date: Date}]
})

var DestinationSchema = mongoose.Schema({
    destinationId: {type: String, required:true},
    name: {type: String, required: true}
})

var User = mongoose.model('User', UserSchema);
var Location = mongoose.model('Location', LocationSchema);
var Destination = mongoose.model('Destination', DestinationSchema)

module.exports(User, Location, Destination);
