const express = require('express');
const app = express();
const User = require('../models/user')

exports.createNewUser = (req, res, next) => {

  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) return next(err);
    if (user) {
      return res.render('register', { error: 'This username already exists.' })
    }
    const newUser = new User({username, name: "", city: "", state:"", password})
    newUser.save(function(err) {
      if (err) return next(err);
      req.login(newUser, (err) => {
        if (err) return next(err);
        res.redirect('/book/books');
      })
    })
  });
}

exports.getProfile = (req, res, next) => {
    res.render('profile')
}

exports.getRegistration = (req, res, next) => {
    res.render('register')
}

exports.getLogout = (req, res, next) => {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
}
