const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name : {type : String, required : true},
        price : {type : Number, required : true},
        image : {
            path :{type : String, required : true},
            filename : {type : String, required : true}
        },
        description : String,
        releaseDate : String,
        stockQty : Number,
        category : String
    }
)


module.exports = mongoose.model ('Products', ProductSchema)