const path = require ('path');
const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/booktrade');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
console.log('Express server has started on', port);

});
