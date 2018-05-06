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
    const newUser = new User({ username, name: "", city: "", state: "", password })
    newUser.save(function (err) {
      if (err) return next(err);
      req.login(newUser, (err) => {
        if (err) return next(err);
        res.redirect('/book/books');
      })
    })
  });
}

exports.getProfile = (req, res, next) => {
  User.findById(req.user.id, (err, user) => {
    if (err)
      return next(err)
    res.render('profile', { user })
  });
}

exports.updateProfile = (req, res, next) => {
  const { name, city, state } = req.body
  User.findByIdAndUpdate(req.user.id, { $set: { name, city, state } }, {
    new: true
  }, function (err, user) {
    if (err) {
      console.log('Database Error', err)
      return next(err)
    }
    res.render('profile', { user })
  });
}

exports.getRegistration = (req, res, next) => {
  res.render('register')
}

exports.getLogout = (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
}
