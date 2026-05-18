const express = require("express");
const {
  handlegenerateshorturl,
  handleanalytics,
} = require("../controller/url");
const router = express.Router();

router.post("/", handlegenerateshorturl);
router.get("/analytics/:ShortID", handleanalytics);

module.exports = router;
