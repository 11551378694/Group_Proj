const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: ObjectId, ref: "Role"}],
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

var RoleSchema = mongoose.Schema({
    name: {type: String}
})

var User = mongoose.model('User', UserSchema);
var Location = mongoose.model('Location', LocationSchema);
var Destination = mongoose.model('Destination', DestinationSchema)
var Role = mongoose.model('Role', RoleSchema)

module.exports(User, Location, Destination, Role);
