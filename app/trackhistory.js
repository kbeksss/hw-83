const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');
const Track = require('../models/Track');

const router = express.Router();

router.post('/', async (req, res) => {
    const authorizationHeader = req.get('Authorization');

    if(!authorizationHeader){
        return res.status(401).send({error: 'Not authorized'});
    }
    const [type, token] = authorizationHeader.split(' ');
    if(type !== 'Token' || !token){
        return res.status(401).send({error: "Not authorized"});
    }
    const user = await User.findOne({token});

    if(!user){
        return res.status(401).send({error: "Unauthorized user"});
    }
    const track = await Track.findById(req.body.track);
    if(!track){
        return res.status(401).send({error: "No such track"});
    }
    const dateTime = new Date();
    const trackHistory = new TrackHistory({...req.body, datetime: dateTime.toISOString(), user: user._id});

    try{
        await trackHistory.save();
        res.send(trackHistory);
    } catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;
