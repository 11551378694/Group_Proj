const express = require('express');
const app = express();
var cors = require('cors'); //Cross-origin resource sharing
//whenever get the request, I'll call this function to use express.json(), to interpret the incoming jSON
app.use(express.json());
app.use(express.static('src'))
app.use(cors());
//
//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to mongoose
var mongoose = require('mongoose');
const { exec } = require('cli');
mongoose.connect("mongodb://s1155:pw@localhost/s1155") //finish connecting to mongoose

var db = mongoose.connection;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Event Schema
var UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favouritePlace: [String]
});

var LocationSchema = mongoose.Schema({
    name:{type: String, required: true},
    LatAndLong:{type: String, require: true},
    userComments:[{body: String, username: ObjectId, ref:'User', date: Date}]
})

module.exports(User, Location);
//module.exports = { Event, Location };
//var Location = mongoose.model('Location', LocationSchema);
//var Event = mongoose.model('Event', EventSchema);
var User = mongoose.model('User', UserSchema);
var Location = mongoose.model('Location', LocationSchema);


// Upon connection failure
db.on("error", console.error.bind(console, "Connection error:"));
// Upon opening the database successfully  
db.once('open', function () {
    console.log("Connection is open...");
});



//Hello World

//my port: 2117
const server = app.listen(2117);