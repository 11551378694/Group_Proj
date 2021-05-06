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

  app.post('/admin/api/location/create', LocationCtrl.createLocation)
  app.post('/admin/api/location/retrieve', LocationCtrl.retrieveLocation)
  app.post('/admin/api/location/update', LocationCtrl.updateLocation)
  app.post('/admin/api/location/delete', LocationCtrl.deleteLocation)
  app.post('/admin/api/location/refresh', LocationCtrl.refreshLocation)

}