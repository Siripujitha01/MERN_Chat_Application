const express = require('express')
const {registerUser, authUser, allUsers} = require('../controllers/userControllers')
const { protect } = require('../Middleware/authMiddleware')
const userRoutes = express.Router()

userRoutes.route('/').post(registerUser).get(protect, allUsers)
userRoutes.route('/login').post(authUser)

module.exports = userRoutes