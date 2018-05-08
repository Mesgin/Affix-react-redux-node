const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Profile = require('../../models/Profile')
const passport = require('passport')

router.get('/', passport.authenticate('jwt',{session:false}), (req,res)=>{
  const errors = {}
  Profile.findOne({user:req.user.id})
    .then(profile => {
      if(!profile){
        errors.noProfile = 'No profile found'
        res.status(404).json(errors)
      }
      res.json(profile)
    })
})

module.exports = router