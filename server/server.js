const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch'); //for fetching the xml file from the api
const DOMParser = require('xmldom').DOMParser; // for parsing the xml file
const cors = require("cors");
var mongoose = require('mongoose');

const path = __dirname + '/app/views/';

const app = express();

app.use(express.static(path));
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect('mongodb://s1155108980:x67037@localhost/s1155108980', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

const Location = db.location;
app.get('/getplaces/:sortkey/:order',function(req,res){
        let sortkey = req.params.sortkey;
	let order = Number(req.params.order);
        Location.find({})
                .sort([[sortkey,order]])
                .exec(function(err, locations){
                if(err)
                        console.log("Error in get locations from db");

                let locationList = [];
                if(locations.length>0){
                        for(i = 0;i<locations.length;i++){
                                let location = {
                                        locationId : locations[i].locationId,
                                        name : locations[i].name,
                                        latitude : locations[i].latitude,
                                        longitude : locations[i].longitude
                                }
                                locationList.push(location);
                        }
                }

                res.send(JSON.stringify(locationList));
        });
});

app.get('/displaysearchresultintable/:searchField/:searchKey',function(req,res){
	let searchKey = req.params.searchKey;
	let searchField = req.params.searchField;
	console.log(searchKey);
	console.log(typeof searchKey);
	console.log(searchField);
	console.log(typeof searchField);
	let search = {};
	search[searchField] = { '$regex':searchKey, '$options':'i'};
	console.log(search);
	Location.find(search)
		.exec(function(err,locations){
		if(err)
                        console.log("Error in get locations from db");

                let locationList = [];
                if(locations.length>0){
                        for(i = 0;i<locations.length;i++){
                                let location = {
                                        locationId : locations[i].locationId,
                                        name : locations[i].name,
                                        latitude : locations[i].latitude,
                                        longitude : locations[i].longitude
                                }
                                locationList.push(location);
                        }
                }
		else{
			locationList.push({
					locationId : "N/A",
                                        name : "N/A",
                                        latitude : "N/A",
                                        longitude :"N/A" 
                                });
		}



                res.send(JSON.stringify(locationList));
        });
});
const Comment = db.comment;
app.get('/getusercomments/:locationId',function(req,res){
	Comment.findOne({locationId : req.params.locationId})
	.exec(function(err,location){
		let userComments = [];
		if(err)
			console.log("error happends in get user comments");
		if(location!=null){
			userComments = location.userComments;
			userComments = userComments.reverse();
		}
		res.send(JSON.stringify(userComments));
	});
});

app.post('/postusercomments/:locationId',function(req,res){
	let condition = {locationId : req.params.locationId};
	let newData = {
		body:req.body.body,
		username:req.body.username,
		date : req.body.date
	};
	Comment.find(condition).exec(function(err,res){console.log(res)});

	Comment.update({'locationId': req.params.locationId},
		{$push:{"userComments":newData}},function(err,raw){
		if (err)
			console.log(err);
		console.log("the raw response : " + err);
	});
	
});
const User = db.user;
app.post('/postfavouritelocations',function(req,res){
  let username=req.body.username;
  let locationId = req.body.locationId;
  console.log(username);
  console.log(locationId);
  Location.findOne({'locationId':locationId})
  .exec(function(err,loc){
      if(err)
        console.log(err);
      if(loc!=null){
          User.findOne({'username':username})
          .exec(function(err,user){
              if(err)
                console.log(err);
              if(user!=null){
		      console.log(loc.id);
		if(!user.favouritePlace.includes(loc.id)){
			User.update({'username':username},
				{$push:{"favouritePlace":loc}},
				function(err,raw){
					if(err)
						console.log(err);
					else
						console.log('update success');
				});
		}
		      
                console.log(user.favouritePlace);
              }
		  console.log(user);
          });
      }
  });
});
app.get('/table', function (req,res) {
  res.sendFile(__dirname + "/table.html");
});
app.get('/singleplace.jsx',function(req,res){
	res.sendFile(__dirname+'/singleplace.jsx');
});
app.get('/table.jsx',function(req,res){
	res.sendFile(__dirname+'/table.jsx');
});
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./api/admin-router")(app);
require("./api/location-router")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
