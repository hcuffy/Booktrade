const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/booktrade');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json('*/*'));

app.use(
	session({ secret: 'bookingtrading', saveUninitialized: true, resave: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('*', function(req, res, next) {
	res.locals.user = req.user || null;
	res.locals.error = null;
	next();
});

const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Express server has started on', port);
});
