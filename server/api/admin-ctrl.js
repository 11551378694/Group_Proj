const User = require('../app/models/user.model')

createUser = (req, res) => {
  let max_user;
  let query = User.findOne({});
  query.sort({ userId: -1 })
  query.exec((err, user) => {
    if (err) return handleError(err);
    //hard coded user role id
    let userRoleID = require('mongoose').Types.ObjectId("608d6053f7a20712088f6df6")
    max_user = user.userId + 1;
    let account = new User({
      userId: max_user,
      username: req.body['username'],
      password: require("bcryptjs").hashSync(req.body['password'], 8),
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
  let query = User.findOne({ userId: parseInt(req.body['userId']) }, (err, result) => {
    if (result == null) {
      return res.send("No existed userID");
    } else {
      query.exec((err, user) => {
        if (err) return handleError(err);
        res.send("This is user " + user.userId + ":<br>\n" +
          "Username: " + user.username + "<br>\n");
        //Do not send the password just because it is required in the spec
        //+ "Password: " + user.password + "<br>\n");
      }
      )
    }
  })
}

updateUser = (req, res) => {
  User.findOne({ userId: parseInt(req.body['userId']) }, (err, result) => {
    if (result == null) {
      return res.send("No existed userID");
    } else {
      let user = {}
      let flag = 0
      if (req.body['username'] !== null && req.body['username'] !== undefined) {
        user["username"] = req.body['username']
        flag++
      }
      if (req.body['password'] !== null && req.body['password'] !== undefined) {
        user["password"] = require("bcryptjs").hashSync(req.body['password'], 8)
        flag++
      }
      if (flag !== 0) {
        User.findOneAndUpdate(
          { userId: parseInt(req.body['userId']) },
          user,
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
  User.findOne({ userId: parseInt(req.body['userId']) }, (err, result) => {
    if (result == null) {
      return res.send("No existed userID");
    } else {
      User.findOneAndDelete(
        { userId: parseInt(req.body['userId']) },
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
