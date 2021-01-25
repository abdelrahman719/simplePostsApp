const app = require('express').Router()


const postModel = require('../model/post.model')

app.get('/profile', async (req,res)=>{


    if (req.session.isLoggedIn == true) {
        console.log(req.session.userID)
      const posts= await  postModel.find({userID: req.session.userID})
    
     console.log(posts)
     res.render('profile.ejs',{posts ,nickname: req.session.name, userID:req.session.userID})
    }
    else {
        res.redirect('/')
    }


  
})

module.exports=app