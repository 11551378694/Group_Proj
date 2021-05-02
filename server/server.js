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

var formattedData = []; // store the data in the readable format fetched from the api 
//convert the raw data into readable format
fetch('https://resource.data.one.gov.hk/td/journeytime.xml')
        .then(res=>res.text())
        .then(data => {
                let parser = new DOMParser();
                let xml = parser.parseFromString(data,'text/xml');
                let places = xml.getElementsByTagName('jtis_journey_time');
                //console.log(places[0].childNodes[1].childNodes[0].data);
                for (i=0;i<places.length;i++){
                        formattedData.push({
                                locationID: places[i].childNodes[1].childNodes[0].data,
                                destinationID: places[i].childNodes[3].childNodes[0].data,
                                captureDate: places[i].childNodes[5].childNodes[0].data,
                                journeyType: places[i].childNodes[7].childNodes[0].data,
                                journeyData: places[i].childNodes[9].childNodes[0].data,
                                colorID: places[i].childNodes[11].childNodes[0].data

                        });
                }
    //console.log(formattedData);
});
