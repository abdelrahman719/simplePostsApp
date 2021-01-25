const app = require('express').Router()
const userModel = require('../model/user.model')
const bcrypt = require("bcrypt")
const { check, validationResult } = require('express-validator');
const validationChangePassword = require('../validation/validation.changePassword');


app.get('/setting', (req, res) => {

    res.render('settings.ejs', {errors:req.flash("errors"), nickname: req.session.name, notEqualpass: false, wrongpassword: false })
})
app.post('/handelEditPassword', validationChangePassword, async (req, res) => {

    const errors = validationResult(req)

    const { oldPassword, newPassword, ConformNewPassword } = req.body;
    const user = await userModel.findOne({ _id: req.session.userID })
   // console.log(user)
    const match = await bcrypt.compare(oldPassword, user.password);



    if (errors.isEmpty() == true) {
        if (match) {

            if (newPassword == ConformNewPassword) {
                bcrypt.hash(newPassword, 6, async function (err, hashnewpass) {

                    await userModel.findOneAndUpdate({ _id: req.session.userID }, { password: hashnewpass })

                    res.redirect('/login')
                });
            }
            else {
                res.render('settings.ejs', { errors:req.flash("errors"), nickname: req.session.name, notEqualpass: true, wrongpassword: false })
            }


        }
        else {
            res.render('settings.ejs', { errors:req.flash("errors"), nickname: req.session.name, wrongpassword: true, notEqualpass: false })
        }

    }
 
    else {
        req.flash("errors", errors.array());
        
        if(!match)
        {
            res.render('settings.ejs', { errors:req.flash("errors"), nickname: req.session.name, wrongpassword: true, notEqualpass: false })
        }

        res.redirect('/setting')
  
    }



})

module.exports = app