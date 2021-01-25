const { check } = require('express-validator')

module.exports = [

  
    check('email').isEmail(),
  
 
]