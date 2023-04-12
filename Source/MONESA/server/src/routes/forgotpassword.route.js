const express = require("express");
const router = express.Router();

const forgotPasswordController = require("../controllers/forgotpassword.controller");

router.get("/", forgotPasswordController.forgotPasswordGET);
router.post("/mail", forgotPasswordController.forgotPasswordMailPOST);

router.post("/reset/check", forgotPasswordController.resetCheckMailPOST)
router.post("/reset", forgotPasswordController.ResetPOST)

module.exports = router;