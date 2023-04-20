const Trailer = require('../models/trailer');

exports.GetAddTrailer = (req, res, next) => {
    res.render("add-trailer", {title: "Add Trailer"})
    req.flash('successUpdated', 'Trailer updated Sucesssfully');
};

exports.PostAddTrailer = async (req, res, next) => {
    
    const {title, year, directors, actors, summary, image, trailerUrl} = req.body;
    const newTrailer = new Trailer({title, year, directors, actors, summary, image, trailerUrl});
    await newTrailer.save();
    req.flash('success_msg', 'Trailer Added Sucesssfully');
    res.status(201).redirect("/");
}

exports.GetTrailer = async (req, res, next) => {
    const trailer = await Trailer.find({})
    res.render('admin-layout', { trailer })
}

exports.GetEditTrailer = async (req, res, next) => {
    const trailer = await Trailer.findById(req.params.id)
    res.render('edit-trailer', { trailer , title: 'Edit Trailer'});
}

exports.PostEditTrailer = async (req, res, next) => {
    const {title, year, directors, actors, summary, image, trailerUrl} = req.body;
    await Trailer.findByIdAndUpdate(req.params.id, {title, year, directors, actors, summary, image, trailerUrl});
    req.flash('success_msg', 'Trailer updated Sucesssfully');
    res.redirect("/")
}

exports.GetDeleteTrailer = async(req, res, next) => {
    const trailer = await Trailer.findById(req.params.id)
    await Trailer.findById(req.params.id);
    res.render('delete-trailer', { trailer });

}

exports.PostDeleteTrailer = async (req, res, next) => {
    await Trailer.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Trailer removed Sucesssfully');
    res.redirect('/');
}

exports.GetDetailsTrailer = async (req, res, next) => {
    const trailer = await Trailer.findById(req.params.id);
    await Trailer.findById(req.params.id);
    res.render('details-trailer', { trailer })
}