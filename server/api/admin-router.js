const express = require('express')
const AdminCtrl = require('./admin-ctrl')
const router = express.Router()

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/admin/user/create', AdminCtrl.createUser)
  app.post('/admin/api/user/retrieve', AdminCtrl.retrieveUser)
  app.post('/admin/api/user/update', AdminCtrl.updateUser)
  app.post('/admin/api/user/delete', AdminCtrl.deleteUser)

}