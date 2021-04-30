const express = require('express');
const app = express();
var cors = require('cors'); //Cross-origin resource sharing
//whenever get the request, I'll call this function to use express.json(), to interpret the incoming jSON
app.use(express.json());
app.use(express.static('src'))
app.use(cors());

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://s1155108980:x67037@localhost/s1155108980')//finish connecting to mongoose

var db = mongoose.connection;
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

// Upon connection failure
db.on("error", console.error.bind(console, "Connection error:"));
// Upon opening the database successfully  
db.once('open', function () {
    console.log("Connection is open...");
});

const adminRouter = require('./api/admin-router')

app.use('/admin', adminRouter)

//my port: 2117
const server = app.listen(2117);