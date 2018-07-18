const express = require ('express');
const router = express.Router();
const db = require ('../db/knex');
const bodyParser = require('body-parser');
router.use(bodyParser.json());  // !!!!! do I need this to be here as well as index.js?

router.get('/api/players', (req, res) => {
    db('players')
    .select()
    .orderBy('firstName')
    .then(allPlayers => {
        res.status(200).json(allPlayers)
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
});

router.get('/api/players/:id', (req, res) => {
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

router.post('/api/players', (req, res) => {
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

router.get('/api/players/stats/:id1/:id2', (req, res) => {
    var stats = {
        player1: {
            totalWins: null,
            totalLosses: null,
            h2hWins: null,
            winProbability: null
        },
        player2: {
            totalWins: null,
            totalLosses: null,
            h2hWins: null,
            winProbability: null
        }  
    };
    db('games')
    .where({ winnerId: req.params.id1 })
    .count({ count: '*' })
    .first()
    .then(p1TotalWins => {
        stats.player1.totalWins = p1TotalWins.count;
        db('games')
        .where({ winnerId: req.params.id2 })
        .count({ count: '*' })
        .first()
        .then(p2TotalWins => {
            stats.player2.totalWins = p2TotalWins.count;    
            db('games')
            .where({ loserId: req.params.id1 })
            .count({ count: '*' })
            .first()
            .then(p1TotalLosses => {
                stats.player1.totalLosses = p1TotalLosses.count;
                db('games')
                .where({ loserId: req.params.id2 })
                .count({ count: '*' })
                .first()
                .then(p2TotalLosses => {
                    stats.player2.totalLosses = p2TotalLosses.count;
                    db('games')
                    .where({ winnerId: req.params.id1, loserId: req.params.id2 })
                    .count({ count: '*' })
                    .first()
                    .then(p1h2hWins => {
                        stats.player1.h2hWins = p1h2hWins.count;
                        db('games')
                        .where({ winnerId: req.params.id2, loserId: req.params.id1 })
                        .count({ count: '*' })
                        .first()
                        .then(p2h2hWins => {
                            stats.player2.h2hWins = p2h2hWins.count;
                            res.status(200).json(stats); //// THE END
                        })
                        .catch((error) => {
                            res.status(500).json({ error });
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({ error });
                    });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                }); 
            })
            .catch((error) => {
                res.status(500).json({ error });
            });      
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
});

module.exports = router; //makes this available in index.js