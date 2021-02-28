const mongoose = require('mongoose');

//connection url

mongoose.connect('mongodb://localhost/TodoApp');

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('error in connecting DB', err.message);
});

db.once('open', () => {
  console.log('Successfully connected to DB');
});
