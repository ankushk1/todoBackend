const mongoose = require('mongoose');

//connection url

mongoose.connect('mongodb+srv://abx:BCdquPTYBJNZysaI@cluster0.g7rtt.mongodb.net/TodoApp?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
const db = mongoose.connection;

db.on('error', (err) => {
  console.log('error in connecting DB', err.message);
});

db.once('open', () => {
  console.log('Successfully connected to DB');
});
