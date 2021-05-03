const express = require('express')
const LocationCtrl = require('./location-ctrl')
const router = express.Router()

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/admin/location/create', LocationCtrl.createLocation)
  app.post('/admin/location/', LocationCtrl.retrieveLocation)
  app.post('/admin/location/update/', LocationCtrl.updateLocation)
  app.post('/admin/location/delete/', LocationCtrl.deleteLocation)

}