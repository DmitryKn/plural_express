const express = require('express');
const { MongoClient } = require('mongodb');
const authRouter = express.Router();

function router() {
    authRouter.route('/signUp').post((req, res) => {
        res.json(req.body);
    });
    return authRouter;
}

module.exports = router;
