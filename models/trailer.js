const { Schema, model } = require('mongoose');

const trailerSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },

    year: {
        type: Number,
        require: true,
        trim: true
    },

    directors: {
        type: String,
        require: true,
        trim: true
    },

    actors: {
        type: String,
        require: true,
        trim: true
    },

    summary: {
        type: String,
        require: true,
        trim: true
    },

    image: {
        type: String,
        require: true,
    },
    
    trailerUrl:{
        type: String,
    }, 

}, {
    timestamps: true
})

const Trailer = model('Trailer', trailerSchema);

module.exports = Trailer;
