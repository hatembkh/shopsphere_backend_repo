const mongoose = require('mongoose')

const commandeSchema = new mongoose.Schema(
    {
      product : {
        type : mongoose.Types.ObjectId,
        ref : 'Products'
      },
      owner : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
      },
      qte : Number,
      totalPrice : Number,
      orderDate : String,
      status :{
        type : String,
        default : 'Pending'
      }
    }
)


module.exports = mongoose.model('commande', commandeSchema)