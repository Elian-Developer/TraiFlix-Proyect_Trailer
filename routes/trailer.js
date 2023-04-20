const express = require("express");
const router = express.Router();
const trailerController = require("../controller/trailerController")

router.get('/', trailerController.GetTrailer);

module.exports = router;