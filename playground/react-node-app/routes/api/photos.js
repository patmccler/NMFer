const express = require('express');
const router = express.Router();

const IMG_PATH = __dirname + '/photos/';

router.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/photos/dog.jpg');
});
module.exports = router;