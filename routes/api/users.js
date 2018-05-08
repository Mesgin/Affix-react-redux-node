const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

router.get('/',(req,res)=>{
  res.json({msg:'users'})
})

router.post('/register',(req,res)=>{
  let {name,email,password} = req.body
  let avatar = gravatar.url(email,{s: '200', r: 'pg', d: 'mm'})
  User.findOne({email})
    .then(user => {
      if(user){
        return res.status(400).json({email: 'Email Already Exists!'})
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
  let {email,password} = req.body
  User.findOne({email})
  .then(user => {
    if(!user) res.status(404).json('User not found')

    bcrypt.compare(password,user.password)
      .then(isMatch => {
        if(isMatch){
          let payload = {id:user.id}
          jwt.sign(
            payload,
            keys.jwtSecret,
            {expiresIn:3600},
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