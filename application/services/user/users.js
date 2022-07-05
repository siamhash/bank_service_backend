const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { users } = require('../../../models')
const bcrypt = require('bcrypt');
const Password = require("node-php-password");
const { response } = require('express');
dotenv.config();

function generateAccessToken(userId) {
   return jwt.sign(userId, process.env.TOKEN_SECRET, { expiresIn: '84000s' });
}

const login = async (data) => {
   try {
      const result = await users.findOne({
         where: { email: data.email },
      });
      if (result) {
         const token = generateAccessToken({ id: result.id, email : result.email });
         data = {
            name: result.name,
            email : result.email,
            _token: token,
         };
         return { response: data }
      } else {
         return { error: "Invalid Credentials" };
      }
   } catch (error) {
      return { error }
   }
}

const signup = async (data) => {
   try {
      const result = await users.findOne({
         where: { email: data.email },
      });
      if(result){
         return { error : "User Already Exist" };
      }else{
         const { name, email, password: pass } = data;
         const salt = await bcrypt.genSalt(10);
         const password = await bcrypt.hash(pass, salt);
         const result = await users.create({
            name,email,password
         });
         const token = generateAccessToken({ email: result.email });
         data = {
            name: result.name,
            email : result.email,
            _token : token,
         };
         return { response : data }
      }
   } catch (error) {
      return { error }
   }
}

module.exports = {
   login, signup
}