const express = require('express')
const AdminCtrl = require('./admin-ctrl')
const router = express.Router()

router.post('/admin/user/create', AdminCtrl.createUser)
router.get('/admin/user/:userId', AdminCtrl.retrieveUser)
router.post('/admin/update/:userId', AdminCtrl.updateUser)
router.post('/admin/delete/:userId', AdminCtrl.deleteUser)

module.exports = router