const passport = require("passport");
const User = require("../model/User.model");
const workspace = require("../model/Workspace.model")
const transaction = require("../model/Transaction.model")

function registerGET(req, res) {
    res.render("register");
}

function registerPOST(req, res) {
    console.log(req.body)
    //module passport-local-monogo cung cap cho chung ta ham dang nhap su dung truc tiep bien User tu mongo
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(203).json({ error: 'A user with the given username is already registered' });
        } else {
            user.displayName = `${user.username}`;
            user.defaultWorkspace = new workspace.Workspace({ name: `${user.username}'s workspace` });
            user.defaultWorkspace.transactions.push(new transaction.Transaction({
                name: "default transaction",
                amount: 0,
                type: "income",
                date: new Date()
            }));
            user.save();
            passport.authenticate("local")(req, res, function () {
                return res.status(200).json(user._id);
            });
        }
    });
}

module.exports = {
    registerGET,
    registerPOST
};