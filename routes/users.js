const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config =require('../config/database');
const User  =require('../models/user');


//Register
router.post('/register',(req,res,next)=>{
    let newuser= new User({
        name: req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });

    User.adduser(newuser,(err)=>{
        if(err){
            res.json({success: false,msg:"falid to register"});
        } else{
            res.json({success: true,msg:" USER Register"});
        }
    });
});

//Authentication
router.post('/authentication',(req,res,next)=>{
    const username =req.body.username;
    const password = req.body.password;
   
    User.gutUserByUsername(username,(err,user)=>{
      
        if(err) throw err;
        if(!user){
            return res.json({success: false , msg:user});
        }

        User.comparePassword(password, user.password, (err,ismatch)=>{
        
            if(err) throw err;
            if(ismatch){
    
                const token = jwt.sign({data: user},config.secret,{ expiresIn: 604800 });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user:{
                        id:user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else{
                res.json({success:false,msg:"wrong password"})
            }

        });
    });
});

//Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({user:req.user});
});

//Validate
router.get('/validate',(req,res,next)=>{
    res.send('VALIDATE');
});

module.exports = router;