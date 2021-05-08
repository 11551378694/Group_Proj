// update on /server/api/location-ctrl.js
// with change in lines 37-53, 227

const Location = require('../app/models/location.model')
const User = require('../app/models/user.model')

createLocation = (req, res) => {
  let new_location = new Location({
    locationId: req.body['locationId'],
    name: req.body['name'],
    latitude: parseFloat(req.body['latitude']),
    longitude: parseFloat(req.body['longitude']),
    userComments: []
  })
  new_location.save((err) => {
    if (err)
      res.send(err);
    res.send("Create Location success")
  })
}

retrieveLocation = (req, res) => {
  let query = Location.findOne({ locationId: req.body['locationId'] }, (err, result) => {
    if (result == null) {
      return res.send("No existed locationId");
    } else {
      query.exec((err, location) => {
        if (err) return handleError(err);
        res.send("This is location " + location.locationId + ":<br>\n" +
          "Location name: " + location.name + "<br>\n" +
          "Latitude: " + location.latitude + "<br>\n" +
          "Longitude: " + location.longitude + "<br>\n");
      })
    }
  })
}

retrieveFavLocation = (req, res) => {
  console.log(req.body)
  let query = User.findOne({username: req.body['username']  }, (err, result) => {
    if (result == null) {
      return res.send("No place is added to faourite list.");
    } else {
      query.populate('Location')
      query.exec((err, result) => {
        if (err) return handleError(err);
        res.send(result)

      })
    }
  })
}

updateLocation = (req, res) => {
  Location.findOne({ locationId: req.body['locationId'] }, (err, result) => {
    if (result == null) {
      return res.send("No existed locationId");
    } else {
      let locationObj = {}
      let flag = 0
      if (req.body['latitude'] !== null && req.body['latitude'] !== undefined) {
        locationObj["latitude"] = parseFloat(req.body['latitude'])
        flag++
      }
      if (req.body['longitude'] !== null && req.body['longitude'] !== undefined) {
        locationObj["longitude"] = parseFloat(req.body['longitude'])
        flag++
      }
      if (req.body['name'] !== null && req.body['name'] !== undefined) {
        locationObj["name"] = req.body['name']
        flag++
      }
      if (flag !== 0) {
        Location.findOneAndUpdate(
          { locationId: req.body['locationId'] },
          locationObj,
          (err, result) => {
            if (err) return handleError(err);
            res.send("Update location success");
          }
        )
      } else {
        res.send("Update Error: no name, latitude and longitude received");
      }
    }
  })
}

deleteLocation = (req, res) => {
  Location.findOne({ locationId: req.body['locationId'] }, (err, result) => {
    if (result == null) {
      return res.send("No existed locationId");
    } else {
      Location.findOneAndDelete(
        { locationId: req.body['locationId'] },
        (err) => {
          if (err) return handleError(err);
          res.send("Delete location success");
        }
      )
    }
  })
}

refreshLocation = (req, res) => {
  let savedObjList = [
    {
      "locationId": "H1",
      "name": "JTI at Gloucester Road eastbound near the Revenue Tower",
      "latitude": 22.279311622,
      "longitude": 114.172101664
    },
    {
      "locationId": "H2",
      "name": "JTI at Canal Road Flyover northbound near exit of Aberdeen Tunnel",
      "latitude": 22.271587756,
      "longitude": 114.180185283
    },
    {
      "locationId": "H3",
      "name": "JTI at Island Eastern Corridor westbound near City Garden",
      "latitude": 22.292018819,
      "longitude": 114.193869616
    },
    {
      "locationId": "H11",
      "name": "JTI at Island Eastern Corridor westbound near Lei King Wan",
      "latitude": 22.285235888,
      "longitude": 114.221346549
    },
    {
      "locationId": "K01",
      "name": "JTI at Ferry Street southbound near Charming Garden",
      "latitude": 22.315044916,
      "longitude": 114.166786346
    },
    {
      "locationId": "K02",
      "name": "JTI at Gascoigne Road eastbound near the Hong Kong Polytechnic University",
      "latitude": 22.305896494,
      "longitude": 114.178474746
    },
    {
      "locationId": "K03",
      "name": "JTI at Waterloo Road southbound near Kowloon Hospital",
      "latitude": 22.324182195,
      "longitude": 114.178378266
    },
    {
      "locationId": "K04",
      "name": "JTI at Princess Margaret Road southbound near Oi Man Estate",
      "latitude": 22.313310630,
      "longitude": 114.176931903
    },
    {
      "locationId": "K05",
      "name": "JTI at Kai Fuk Road northbound near the petrol stations",
      "latitude": 22.319902728,
      "longitude": 114.206732056
    },
    {
      "locationId": "K06",
      "name": "JTI at Chatham Road North southbound near Fat Kwong Street Playground",
      "latitude": 22.309177485,
      "longitude": 114.184084134
    },
    {
      "locationId": "SJ1",
      "name": "JTI at Tai Po Road – Sha Tin near the Racecourse",
      "latitude": 22.404797024,
      "longitude": 114.207347960
    },
    {
      "locationId": "SJ2",
      "name": "JTI at Tate’s Cairn Highway near Shek Mun",
      "latitude": 22.389757785,
      "longitude": 114.210593926
    },
    {
      "locationId": "SJ3",
      "name": "JTI at Tolo Highway near Science Park",
      "latitude": 22.426975789,
      "longitude": 114.206972621
    },
    {
      "locationId": "SJ4",
      "name": "JTI at San Tin Highway near Pok Wai Road",
      "latitude": 22.464106829,
      "longitude": 114.053710459
    },
    {
      "locationId": "SJ5",
      "name": "JTI at Tuen Mun Road near Tuen Mun Heung Sze Wui Road",
      "latitude": 22.401075772,
      "longitude": 113.977226590
    }
  ]
  savedObjList.forEach((value, index) => {
    Location.findOne({ locationId: value.locationId }, (err, result) => {
      if (result == null) {
        let new_location = new Location(
          {
            ...value,
            userComments: []
          }
        )
        new_location.save((err) => {
          if (err)
            res.send(err);
        })
      }
    }).then(() => {
      if (index === savedObjList.length - 1) {
        res.send("Refresh location success");
      }
    })
  })
}

module.exports = {
  createLocation,
  retrieveLocation,
  updateLocation,
  deleteLocation,
  refreshLocation,
  retrieveFavLocation
}
