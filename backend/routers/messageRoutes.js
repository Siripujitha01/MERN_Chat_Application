const express = require('express');
const { protect } = require('../Middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messageControllers');

const routes = express.Router();

routes.route('/').post(protect, sendMessage)
routes.route('/:chatId').get(protect, allMessages)

module.exports = routes