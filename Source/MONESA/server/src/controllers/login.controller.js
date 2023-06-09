const passport = require("passport");
const User = require("../model/User.model");


function loginGET(req, res) {
    res.render("login");
}

//https://www.geeksforgeeks.org/when-to-use-next-and-return-next-in-node-js/#:~:text=In%20this%20is%20article%20we,next()%20will%20be%20unreachable.
function loginPOST(req, res, next) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(user)

            console.log("errr")
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            console.log(user._id)
            return res.status(200).json({ _id: user._id });
        });
    })(req, res, next);
}

module.exports = {
    loginGET,
    loginPOST
};