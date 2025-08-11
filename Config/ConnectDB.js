const mongoose = require('mongoose')

const ConnectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mongodb+srv://boukhroufhatem04:hatem1607@cluster0.pbtqy1k.mongodb.net/')
        console.log('DB is connected')
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = ConnectDB 