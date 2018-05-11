const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

router.get('/',(req,res)=>{
  res.json({msg:'users'})
})

router.post('/register',(req,res)=>{
  
  const {errors,isValid} = validateRegisterInput(req.body)
  
  if(!isValid){
    return res.status(400).json(errors)
  }

  let {name,email,password} = req.body
  let avatar = gravatar.url(email,{s: '200', r: 'pg', d: 'mm'})
  User.findOne({email})
    .then(user => {
      if(user){
        errors.email = 'Email Already Exists!'
        return res.status(400).json(errors)
      } else {
        let newUser = new User({
          name,
          email,
          password,
          avatar
        })
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password,salt, (err,hash)=>{
            if(err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

router.post('/login',(req,res)=>{
  let { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let {email,password} = req.body
  User.findOne({email})
  .then(user => {
    if(!user) res.status(404).json('User not found')

    bcrypt.compare(password,user.password)
      .then(isMatch => {
        if(isMatch){
          let payload = {id:user.id,name:user.name,avatar:user.avatar}
          jwt.sign(
            payload,
            keys.jwtSecret,
            {expiresIn:360000},
            (err,token)=>{
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            }
          )
        } else {
          res.status(400).json('incorrect password')
        }
      })
  })
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router