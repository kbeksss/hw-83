const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const mongoose = require('mongoose');
const config = require('../config');
const Album = require('../models/Album');

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    if(req.query.artist){
        try{
            const artistAlbums = await Album.find({artist: ObjectId(req.query.artist)});
            res.send(artistAlbums);
        } catch (e) {
            res.status(404).send(e);
        }
    } else{
        try{
            const albums = await Album.find();
            res.send(albums);
        } catch(e){
            res.status(404).send(e);
        }
    }

});

router.get('/:id', async (req, res) => {
    try{
        const album = await Album.findById(req.params.id).populate('artist');
        res.send(album);
    } catch (e){
        res.status(404).send(e);
    }
});

router.post('/', upload.single('coverImage'), async (req, res) => {
    const albumData = req.body;

    if(req.file){
        albumData.coverImage = req.file.filename;
    }

    const album = new Album(albumData);

    try{
        await album.save();
        res.send({albumId: album._id})
    } catch(e){
        res.status(400).send(e);
    }
});




module.exports = router;
