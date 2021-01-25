const { check } = require('express-validator')

module.exports = [

    check('fname').matches(/[A-Z][a-z]*/),
    check('lname').matches(/[A-Z][a-z]*/),
    check('nickname').matches(/[A-Z][a-z]*/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
 
]