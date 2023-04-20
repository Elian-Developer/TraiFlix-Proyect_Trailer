const express = require("express");
const router = express.Router();

const adminController = require('../controller/adminController')

//Add Trailers
router.get("/add-trailer", adminController.GetAddTrailer);

router.post("/add-trailer", adminController.PostAddTrailer);

// Get all Trailers
router.get("/trailer", adminController.GetTrailer)

//Edit TRailer
router.get('/trailer/edit/:id', adminController.GetEditTrailer);

router.post('/trailer/edit/:id', adminController.PostEditTrailer);

//Delete Trailer
router.get('/trailer/delete/:id', adminController.GetDeleteTrailer);

router.post('/trailer/delete/:id', adminController.PostDeleteTrailer)

//Get details Trailer
router.get('/trailer/details/:id', adminController.GetDetailsTrailer);

module.exports = router;