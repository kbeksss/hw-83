const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectID,
        ref: 'Album',
    },
    durationS: {
        type: Number,
        required: true
    }
});

const Track = new mongoose.model('Track', TrackSchema);

module.exports = Track;
