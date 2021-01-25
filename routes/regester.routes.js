const app = require('express').Router()
const bcrypt = require("bcrypt")
const userModel = require('../model/user.model');
const { check, validationResult } = require('express-validator');
const vailationRegster = require('../validation/validation.reqgester');


app.get('/regester', (req, res) => {

    let oldInputs =req.flash("oldInputs")[0]

    if(oldInputs==undefined)
    {
        oldInputs= {
            fname: '',
            lname: '',
            nickname: '',
            email: '',
            password: ''
          }
        
    }
 
    res.render('regester.ejs',{errors:req.flash("errors") , oldInputs})
})



app.post('/handelRegester', vailationRegster, async (req, res) => {
    const errors = validationResult(req)
   //!console.log(errors.array());
   //! console.log(errors.isEmpty());
    const { fname, lname, nickname, email, password } = req.body
    if (errors.isEmpty() == true) {

        bcrypt.hash(password, 6, async function (err, hashpass) {
            await userModel.insertMany({ fname, lname, nickname, email, password: hashpass })
            res.redirect('/login')
        });

    } else {

      //!  console.log(errors.array())
        req.flash("errors" ,errors.array());
       // console.log(req.body)
        req.flash("oldInputs" ,req.body)
        res.redirect('/regester')

    }

})
module.exports = app
