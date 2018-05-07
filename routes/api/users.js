const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

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
        const newUser = new User({
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

module.exports = router