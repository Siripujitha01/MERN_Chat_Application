const express = require('express');
const { protect } = require('../Middleware/authMiddleware');
const { createGroupChat, fetchChats, renameGroup, removeFromGroup, addToGroup, accessChat } = require('../controllers/chatControllers');

const chatRoutes = express.Router()

chatRoutes.route('/').post(protect, accessChat).get(protect, fetchChats)
chatRoutes.route("/group").post(protect, createGroupChat);
chatRoutes.route("/rename").put(protect, renameGroup);
chatRoutes.route("/groupremove").put(protect, removeFromGroup);
chatRoutes.route("/groupadd").put(protect, addToGroup);

module.exports = chatRoutes