const express = require('express')
const AdminCtrl = require('./admin-ctrl')
const router = express.Router()

router.post('/admin/create', AdminCtrl.createUser)
router.get('/admin/user/:userId', AdminCtrl.createUser)

module.exports = router