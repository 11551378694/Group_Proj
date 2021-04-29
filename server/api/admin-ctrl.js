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

}


module.exports = {
    createUser,
    retrieveUser
}