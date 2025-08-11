const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: String,
    adress : String,
    image: {
        url: {
            type: String,
            default: "/userDefaultImage.png" 
        },
        filename: {
            type: String,
            default: "default.jpg"  
        }
    },
    role: {
        type: String,
        default: "user"
    }
})

module.exports = mongoose.model('User', UserSchema) 