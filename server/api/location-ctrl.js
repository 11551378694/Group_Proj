const Location = require('../app/models/location.model')

createLocation = (req, res) => {
  let max_location;
  let query = Location.findOne({});
  query.sort({ locationId: -1 })
  query.exec((err, location) => {
    if (err) return handleError(err);
    max_location = location.locationId + 1;
    let new_location = new Location({
      locationId: max_location,
      name: req.body['name'],
      latitude: parseFloat(req.body['latitude']),
      longitude: parseFloat(req.body['longitude']),
      userComments: []
    })
    new_location.save((err) => {
      if (err)
        res.send(err);
      console.log("Create Location success")
    })
  })
}

retrieveLocation = (req, res) => {
  let query = Location.findOne({ locationId: parseInt(req.body['locationId']) }, (err, result) => {
    if (result == null) {
      return res.send("No existed locationId");
    } else {
      query.exec((err, location) => {
        if (err) return handleError(err);
        res.send("This is location " + location.locationId + ":<br>\n" +
          "Location name: " + location.name + "<br>\n" +
          "Latitude: " + location.Latitude + "<br>\n" +
          "Longitude: " + location.Longitude + "<br>\n");
      }
      )
    }
  })
}

updateLocation = (req, res) => {
  Location.findOne({ locationId: parseInt(req.body['locationId']) }, (err, result) => {
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
          { locationId: parseInt(req.body['locationId']) },
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
  Location.findOne({ locationId: parseInt(req.body['locationId']) }, (err, result) => {
    if (result == null) {
      return res.send("No existed locationId");
    } else {
      Location.findOneAndDelete(
        { locationId: parseInt(req.body['locationId']) },
        (err) => {
          if (err) return handleError(err);
          res.send("Delete location success");
        }
      )
    }
  })
}

module.exports = {
  createLocation,
  retrieveLocation,
  updateLocation,
  deleteLocation,
}