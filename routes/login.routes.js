const app = require('express').Router();
const userModel = require('../model/user.model');
const bcrypt = require("bcrypt");
const { check, validationResult } = require('express-validator');
const validationLogin = require('../validation/validation.login');




app.get('/', (req, res) => {

    res.redirect("/")
})

app.get('/login', (req, res) => {
    let oldInputs = req.flash("oldInputs")[0]
    if (oldInputs == undefined) {
        oldInputs = {
            email: ''
        }
    }
    res.render('login.ejs', { notUser: false,wrongPass:false,OldMail: req.flash("oldMail") , errors: req.flash("errors"), oldInputs })

})

//errors:req.flash("errors") , oldInputs,  
app.post('/handelSignin', validationLogin, async (req, res) => {
   
   // let oldInputs = req.flash("oldInputs")[0]
    const errors = validationResult(req)
    const { email, password } = req.body
    let user = await userModel.findOne({ email });

    if (errors.isEmpty() == true) {

        if (user == null) {
            res.render('login.ejs', { notUser: true ,OldMail: req.flash("oldMail") ,wrongPass:false,errors: req.flash("errors")   })
        }
        else {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.userID = user._id;
                req.session.name = user.nickname;
                req.session.isLoggedIn = true;
                console.log(req.session.userid)
                res.redirect('/home')
            }
            else {
                req.flash("oldMail", req.body.email)
                res.render('login.ejs', { notUser: false ,wrongPass:true,OldMail: req.flash("oldMail"),errors: req.flash("errors") })

            }

        }
    }
    else {
        req.flash("errors", errors.array());
        req.flash("oldInputs", req.body)
        res.redirect('/login');

    }









})

module.exports = app