const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
router.post('/to-post', postController.toPost);
module.exports = router;