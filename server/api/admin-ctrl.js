const User = require('../models/model')

createUser = (req, res) => {

    var account = new User({
        username: req.body['username'],
        password: req.body['password'],
        favouritePlace: []
    })

    account.save(function(err) {
        if (err)
            res.send(err);

        console.log("Create user success")
    })
}

retrieveUser = (req, res) => {
    var query = User.findOne({userId: req.params['userId']}, function (err, result) {
        if (result == null) {
          return res.send("No existed userID");
        } else {
          query.exec(function (err, user) {
            if (err) return handleError(err);
              res.send("This is user "+user.userId+":<br>\n" +
                "Username: " + user.username + "<br>\n" +
                "Password: " + user.password + "<br>\n");
            }
          )}
      })
}


module.exports = {
    createUser,
    retrieveUser
}