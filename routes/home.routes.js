const app = require('express').Router()

const postModel = require('../model/post.model');
const { isValidObjectId } = require('mongoose');

app.get('/home', async (req, res) => {
    if (req.session.isLoggedIn == true) {
        
        const posts = await postModel.find()
        console.log(posts[0].dateCreation)
        res.render('home.ejs', { posts, nickname: req.session.name, userID: req.session.userID })
    }
    else {
        res.redirect('/')
    }


})

app.post('/handelPost', async (req, res) => {
    //   console.log(req.body)
    const { title, text } = req.body;

    await postModel.insertMany({ nickname: req.session.name, title, text, userID: req.session.userID })
    res.redirect('/home')
})

module.exports = app