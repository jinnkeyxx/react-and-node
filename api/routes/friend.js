const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
router.get('/info', friendController.info);
module.exports = router;