const express = require('express');
const router = express.Router();
const { chat, getChatHistory } = require('../controllers/chatContoller');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, chat);


router.get('/history', authMiddleware, getChatHistory);

module.exports = router;