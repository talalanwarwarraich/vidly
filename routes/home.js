const express = require('express');
const router = express.Router();

//base url of application
router.get('/', (req, res) => {
    res.send('You application is running. don\'t worry');
});

module.exports = router;
