const passport = require("passport");
const sendMail = require("./mail.controller")
const User = require("../model/User.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET "/"
function forgotPasswordGET(req, res) {
    res.render("forgotPassword");
}

// POST "/mail"
function forgotPasswordMailPOST(req, res) {
    const mail = req.body.username;
    console.log(mail);
    User.findOne({ "username": mail }, async (err, user) => {
        if (err) {
            console.log({ err });
        }
        else if (!user) {
            return res.status(401).json({ check: "False" });
        }
        else {
            bcrypt.hash(user.username, saltRounds).then(async (hashedEmail) => {
                var resp = await sendMail(user.username, `http://localhost:3000/reset/${user.username}?code=${hashedEmail}`);
                // res.redirect(`http://localhost:3000/forgotpassword/reset/${user.username}?code=${hashedEmail}`);
                return res.status(200).json({ check: "True"});
            })
        }
    })
}

// GET /reset/check
function resetCheckMailPOST(req, res) {
    const mail = req.body.mail;
    const code = req.body.code;
    if (!mail || !code) {
        console.log({ err });
        return res.status(401).json({ check: "False" });
    } else {
        bcrypt.compare(mail, code, (err, result) => {
            if (err) {
                console.log({ err });
                return res.status(401).json({ check: "False" });
            }
            else if (!result) {
                console.log("ERROR khong dung mail va code");
                return res.status(401).json({ check: "False" });
            }
            else {
                return res.status(200).json({ check: "True" });
            }
        })
    }
}

// POST "/reset"
function ResetPOST(req, res) {
    mail = req.body.mail;
    newPassword = req.body.password;
    console.log(mail, newPassword)

    User.findOne({ "username": mail }, (err, user) => {
        user.setPassword(newPassword, (err, user) => {
            if (err) {
                console.log({ err });
            }
            else {
                user.save(function (err) {
                    if (err) {
                        console.log({ err });
                    } else {
                        return res.status(200).json({ check: "True" });
                    }
                })
            }
        })

    });
}

// const mail = req.body.username;
// console.log(mail);
// User.findOne({ "username": mail}, (err, user) => {
//     if (err) {
//         console.log({ err });
//     }
//     if (!user) {
//         res.render("forgotPassword", )
//     }
//     else {
//         const resp = sendMail(mail);
//         res.render("forgotPasswordCheckCode");
//         // console.log(user._id);
//         // user.setPassword("987", (err, user) => {
//         //     if (err) {
//         //         console.log({ err });
//         //     }
//         //     else {
//         //         user.save(function (err) {
//         //             if (err) {
//         //                 console.log({ err });
//         //             } else {
//         //                 res.redirect("/login");
//         //            }
//         //         })
//         //     }
//         // })
//     }
// })

module.exports = {
    forgotPasswordGET,
    forgotPasswordMailPOST,
    resetCheckMailPOST,
    ResetPOST
}