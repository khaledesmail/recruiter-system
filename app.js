const express= require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config =require('./config/database');

mongoose.connect(config.database);
// on  connection 
mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database);
});

//on error
mongoose.connection.on('error',(error)=>{
    console.log('Error is '+error);
});
mongoose.Promise = global.Promise;

const app = express();

const users = require('./routes/users');
// port NUmber
const port =process.env.PORT || 8080;
 
// CORS Middelware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middelware
app.use(bodyparser.json());

// passport Middelware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
// root routing
app.use('/users',users);
//index Router
app.get('/',(req,res)=>{
    res.send("invalid endpoint 2");
});

// start Server
app.listen(port,()=>{
    console.log('you are listen at port '+port);
});