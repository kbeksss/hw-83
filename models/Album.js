const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectID,
        ref: 'Artist',
        required: true
    },
    date: String,
    coverImage: String
});

const Album = new mongoose.model('Album', AlbumSchema);

module.exports = Album;
