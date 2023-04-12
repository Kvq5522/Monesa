const express = require("express");
const router = express.Router();

const handleData = require("../controllers/handleData.controller");

router.post("/data", handleData.dataPOST);
router.post("/add", handleData.addTransaction);
router.post("/delete", handleData.deleteTransaction);
router.post("/edit", handleData.updateTransaction);

// router.get("/test", handleData.addTransaction);

module.exports = router;