let Express = require('express')
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const {LogModel} = require('../models');
const Log = require('../models/log'); //

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});


router.post('/', validateJWT, async (req, res) => {
    const {description, definition, result} = req.body.log;
    const {id} = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }

    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

// ! Get all Logs

router.get('/', async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

// ! Get Logs by User 

router.get('/:id', async(req, res) => {
    let {id} = req.user;
    try{
        const userLog = await Log.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLog);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


// ! Update a Log

router.put("/:id", validateJWT, async (req, res) => {
    const {description, definition, result} = req.body.log;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    };

    const updateLog = {
        description: description,
        definition: definition,
        result: result
    };

    try{
        const update = await LogModel.update(updateLog, query);
        res.status(200).json({update})
    } catch (err) {
        console.log(updateLog)
        res.status(500).json({error: err});
    }
});

// ! Delete a Log

router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner_id: ownerId
            }
        }

        await LogModel.destroy(query)
        res.status(200).json({message: "Log Entry Removed"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;
