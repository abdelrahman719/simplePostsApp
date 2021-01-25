const express = require('express');
const app = express();
const path = require('path')
const ejs = require('ejs');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
app.use(flash())


app.set('view engine', 'ejs'); // to define its ejs engine
app.use(express.static(path.join(__dirname, 'public'))); // to define the static file then  set >> / before pathes
app.use(express.urlencoded({ extended: false }));

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/Fb',
    collection: 'myFbApp-Sessions'
  });
   
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
    
}))


app.use(require('./routes/regester.routes'))
app.use(require('./routes/home.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/setting.routes'))
app.use(require('./routes/profile.routes'))

mongoose.connect('mongodb://localhost:27017/Fb', { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(3000, () => {

    console.log('FB exam app is running go on .... ')
})