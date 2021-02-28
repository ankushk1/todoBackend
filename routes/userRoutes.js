const { Router } = require('express');
const express = require('express');

const router = express.Router();
const { signup, login } = require('../controllers/userController');
const { check, validationResult } = require('express-validator');

router.post(
  '/signup',
  [
    check('firstname', 'firstname should be at least 3 char').isLength({
      min: 3,
    }),
    check('lastname', 'lastname should be at least 3 char').isLength({
      min: 3,
    }),
    check('email', 'email is required').isEmail(),
    check('password', 'password should be at least 8 char').isLength({
      min:8, max:15
    }),
  ],
  signup
);
router.post('/login',[
    check('email', 'email is required').isEmail(),
    check('password', 'password should be at least 8 char').isLength({
      min:8, max:15
    }),
  ], login);

module.exports = router;
