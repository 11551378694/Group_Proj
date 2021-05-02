const express = require('express')
const LocationCtrl = require('./location-ctrl')
const router = express.Router()

router.post('/admin/location/create', LocationCtrl.createLocation)
router.get('/admin/location/:locationId', LocationCtrl.retrieveLocation)
router.post('/admin/location/update/:locationId', LocationCtrl.updateLocation)
router.post('/admin/location/delete/:locationId', LocationCtrl.deleteLocation)

module.exports = router