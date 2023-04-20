const Trailer = require('../models/trailer')

exports.GetTrailer = async(req, res, next) => {
    const trailer = await Trailer.find({})
    res.render("trailer", {trailer})
}; 