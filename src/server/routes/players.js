const express = require ('express');
const router = express.Router();
const db = require ('../db/knex');
const bodyParser = require('body-parser');
router.use(bodyParser.json());  // !!!!! do I need this to be here as well as index.js?

router.get('/players', (req, res) => {
    db('players')
    .select()
    .then(allPlayers => {
        res.status(200).json(allPlayers)
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
});

router.get('/players/:id', (req, res) => {
    db('players')
    .where({
        id: req.params.id
    })
    .select()
    .then(matchingPlayer => {
        if (matchingPlayer.length === 0)
            res.status(404).json({error:"No matching player found."})
        else
            res.status(200).json(matchingPlayer)
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
});

router.post('/players', (req, res) => {
    db('players')
    .insert({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickName: req.body.nickName
    })
    .then(addedPlayer => {
        res.status(201).json({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickName: req.body.nickName
        })
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
});

module.exports = router; //makes this available in index.js