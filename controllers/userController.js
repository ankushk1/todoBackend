const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = require('../config/config');
const {check , validationResult} = require('express-validator')

exports.signup = async function (req, res) {
  try {

    const errors = validationResult( req )
    console.log(errors)
    if(!errors.isEmpty()){
      return res.status(400).json({
        message: errors.array()[0].msg
      })
    }
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({ message: 'User exists' });
    }

    User.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      },
      function (err, user) {
        if (err) {
          console.log(err);
          res.status(400).json({ message: 'Error creating user' });
        }
        // console.log(user);
        const { _id, firstname, lastname, email } = user;
        console.log(user);
        
        return res.status(200).json({
          user: { _id, firstname, lastname, email },
          message: 'User Created',
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async function (req, res) {
  try {

    const errors = validationResult( req )
    console.log(errors)

    if(!errors.isEmpty()){
      return res.status(400).json({
        message: errors.array()[0].msg
      })
    }
    
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user || bcrypt.compareSync(user.password, req.body.password)) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const { _id, firstname, email } = user;

    return res.status(200).json({
      data: {
        user: { _id, firstname, email },
        token: jwt.sign(user.toJSON(), key.jwtSecret, {
          expiresIn: '1h',
        }),
      },
      message: 'Login successful',
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
