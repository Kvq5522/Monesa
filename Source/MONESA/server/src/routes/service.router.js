const express = require("express");
const router = express.Router();
const passport = require("passport");


const serviceController = require("../controllers/service.controller");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/secrets", passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(`http://localhost:3000/user/${req.user._id}`);
    });

module.exports = router;