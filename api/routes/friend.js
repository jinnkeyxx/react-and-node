const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
router.get('/offer', friendController.offer);
module.exports = router;