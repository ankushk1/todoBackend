const express=require('express');
const app= express();
const port=8002;
const db= require('./config/mongoose')
const todoRoutes=require('./routes/todoRoutes')
const userRoutes=require('./routes/userRoutes')
const passport =require('./config/passportJwt')
const jwt= require('jsonwebtoken')


app.use(express.urlencoded())
app.use(express.json())

app.use('/user',userRoutes)
app.use("/",passport.authenticate("jwt",{session: false}), todoRoutes);


app.listen(port, ()=>{
    console.log(`The server is running on port: ${port}`);
})