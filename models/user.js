const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//user schema 
const username= mongoose.Schema({
    name:{
        type:String
    },
    email:{
    type: String,
    //required: true  
    },
    username:{
        type: String,
       // required: true
    },
    password:{
        type: String,
       // required:true
    }
});

const User = module.exports = mongoose.model('User',username);

module.exports.getUserById= function(id,callback){
    User.findById(id,callback);
}

module.exports.gutUserByUsername= function(username,callback){
   const query = {username:username};
    User.findOne(query,callback);
}
module.exports.adduser = function(newuser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(newuser.password,salt,(err,hash)=>{
        if(err) throw err
        newuser.password = hash;
        newuser.save(callback);
    });
});
}

module.exports.comparePassword = function(candidatepassword, hash , callback){
bcrypt.compare(candidatepassword,hash,(err,ismatch)=>{
    callback(null, ismatch);
});
}
