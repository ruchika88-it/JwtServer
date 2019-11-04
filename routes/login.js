const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config=require("config");

const User = require("../models/user_model");
const Profile=require("../models/profile_model");
const {  loginValidation } = require('../validation/validation');
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.post("/loginuser", async(req, res) => {
 //validate the data before logging in
   const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if user has already registered or not
  const user = await User.findOne({ emailid: req.body.emailid });
  if (!user) return res.status(400).send('Email not found');

  //authenticating user
  const validPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validPassword) return res.status(400).send('Invalid Password!');

  // making and assign a token
  const token = jwt.sign({ user }, config.get('jwtPrivateKey'));
 
  const profile = await Profile.findOne({ emailid: req.body.emailid });
  if (!profile) return res.send({profile:profile, access_token: token});
 
  try{
  res.send({ profile: {}, access_token: token  });
 }
 catch(ex){
   console.log(ex.message);
 }
});
module.exports = route;
