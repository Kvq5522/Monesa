const User = require("../../model/User.model")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const workspace = require('../../model/Workspace.model');
const transaction = require('../../model/Transaction.model')

require('dotenv').config({
    path: './src/.env'
})

module.exports = (passport) => {
    passport.use(User.createStrategy());

    passport.serializeUser(function (user, done) {      // ma hoa
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {      // giai ma
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ googleId: profile.id }, (err, user) => {
                console.log(user);
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(err, user);
                } else {
                    const newUser = new User({
                        googleId: profile.id,
                        displayName: profile.displayName,
                    });
                    newUser.defaultWorkspace = new workspace.Workspace({
                        owner: newUser.displayName,
                    })
                    newUser.defaultWorkspace.transactions.push(new transaction.Transaction({
                        name: "default transaction",
                        amount: 0,
                        type: "income",
                        date: new Date()
                    }));
                    newUser.save();
                    return done(err, newUser);
                }
            });
        }
    ));
}