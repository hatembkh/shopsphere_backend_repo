const express = require('express')
const ConnectDB = require('./Config/ConnectDB')
const UserRouter = require('./Routes/User')
const ProductRouter = require('./Routes/Product')
const CommentsRouter = require('./Routes/Comments')
const commandeRouter = require('./Routes/Commande')
const cors = require('cors');

const app = express()

require('dotenv').config()

ConnectDB()

app.use(cors({
  origin: 'https://symphonious-monstera-bc1032.netlify.app',
  credentials: true
}));

app.use(express.json())

app.use('/auth', UserRouter)

app.use('/Product', ProductRouter)

app.use('/Comments', CommentsRouter)

app.use('/Commandes', commandeRouter)




app.listen(process.env.PORT , console.log(`Server is running on Port ${process.env.PORT}`))