const User = require('../models/model').User
const Role = require('../models/model').Role

createUser = (req, res) => {
  let max_user;
  var query = User.findOne({});
  query.sort({ userId: -1 })
  query.exec((err, user) => {
    if (err) return handleError(err);
    //hard coded user role id
    let userRoleID = require('mongoose').Schema.Types.ObjectId("608d6053f7a20712088f6df6")
    max_user = user.userId + 1;
    var account = new User({
      userId: max_user,
      username: req.body['username'],
      password: req.body['password'],
      favouritePlace: [],
      roles: [userRoleID]
    })
    account.save((err) => {
      if (err)
        res.send(err);
      console.log("Create user success")
    })
  })
}

retrieveUser = (req, res) => {
  var query = User.findOne({ userId: req.params['userId'] }, function (err, result) {
    if (result == null) {
      return res.send("No existed userID");
    } else {
      query.exec(function (err, user) {
        if (err) return handleError(err);
        res.send("This is user " + user.userId + ":<br>\n" +
          "Username: " + user.username + "<br>\n" +
          "Password: " + user.password + "<br>\n");
      }
      )
    }
  })
}

updateUser = (req, res) => {
  User.findOne({ userId: req.params['userId'] }, (err, result) => {
    if (result == null) {
      return res.send("No existed userID");
    } else {
      let userObj = {}
      let flag = 0
      if (req.body['username'] !== null && req.body['username'] !== undefined) {
        user["username"] = req.body['username']
        flag++
      }
      if (req.body['password'] !== null && req.body['password'] !== undefined) {
        user["password"] = req.body['password']
        flag++
      }
      if (flag !== 0) {
        User.findOneAndUpdate(
          { userId: req.params['userId'] },
          userObj,
          (err, result) => {
            if (err) return handleError(err);
            res.send("Update user success");
          }
        )
      } else {
        res.send("Update Error: no password and no username received");
      }
    }
  })
}

deleteUser = (req, res) => {
  User.findOne({ userId: req.params['userId'] }, (err, result) => {
    if (result == null) {
      return res.send("No existed userID");
    } else {
      User.findOneAndDelete(
        { userId: req.params['userId'] },
        (err) => {
          if (err) return handleError(err);
          res.send("delete user success");
        }
      )
    }
  })
}

module.exports = {
  createUser,
  retrieveUser,
  updateUser,
  deleteUser,
}
