const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');
const passport = require('passport');
require('../config/passport')(passport);


router.get('/profile', usersController.getProfile);
router.post('/profile', usersController.updateProfile);
router.post('/signup', usersController.createNewUser);
router.get('/logout', usersController.getLogout);
router.post('/signin', passport.authenticate('local', {
  successRedirect: '/book/myBooks',
  failureRedirect: '/'

}));

module.exports = router;
