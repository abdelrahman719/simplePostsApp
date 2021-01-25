const mongoose = require('mongoose');
const postShema =mongoose.Schema({


    nickname:String,
    title:String,
    text:String,

   userID: { type: mongoose.Schema.Types.ObjectId },

 dateCreation : {type:Date  , default :Date.now}

})

module.exports=mongoose.model( 'post',postShema)