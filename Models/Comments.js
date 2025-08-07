const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema(
    {
        author: String,
        comment : {type : String, required : true},
        image : String
    }
)


module.exports = mongoose.model('Comments', CommentsSchema)