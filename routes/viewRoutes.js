const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getHome);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);

module.exports = router;
