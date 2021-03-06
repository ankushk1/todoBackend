const express=require('express');
const app= express();
const port=8002;
const db= require('./config/mongoose')
const todoRoutes=require('./routes/todoRoutes')
const userRoutes=require('./routes/userRoutes')
const passport =require('./config/passportJwt')
const jwt= require('jsonwebtoken')
const cors = require('cors')

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())
app.use('/user',userRoutes)
app.use("/todo", passport.authenticate('jwt', { session: false }), todoRoutes);

app.use('/', function(req, res, next){ 
    res.send('heroku runnig'); 
    next(); 
 }); 
   
 app.get('/', function(req, res){ 
     console.log("Body Sent") 
 }); 
   
app.listen(port, (req,res)=>{
    console.log(`The server is running on port: ${port}`);
})