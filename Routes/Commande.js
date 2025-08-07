const express = require('express')
const Commande = require('../Models/Commande')
const { isAuth } = require('../Middlewares/isAuth')
const Product = require('../Models/Product')

const commandeRouter = express.Router()

commandeRouter.post('/AddCommande',  async(req,res)=>{
    try {
        const newCommande = new Commande(req.body)

        await newCommande.save()

        res.status(200).send({msg : 'Commande Added', newCommande})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Add Commande'}]})
    }
} )

commandeRouter.get('/getAllCommandes', async(req,res)=>{
    try {
        const AllCommandes = await Commande.find({ product: { $exists: true, $ne: null } }).populate('owner').populate('product')

        res.status(200).send({msg : 'All Commandes', AllCommandes})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Get Commandes'}]})
    }
})

commandeRouter.get('/GetOneCommand',isAuth, async(req,res)=>{
    try {


        const GetUserCommandes = await Commande.find({owner : req.user._id}).populate('product')

        res.status(200).send({msg : 'Command', GetUserCommandes})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Get Command'}]})
    }
})

commandeRouter.put('/UpdateCommand/:id', async(req,res)=>{

    try {
        const {id}= req.params

        const {status, product, initQte,qte} = req.body

        await Commande.findByIdAndUpdate(id, {$set :{status}})

        if (status == "Accepted" ) {
             await Product.findByIdAndUpdate(product, {$set :{stockQty : initQte - qte }})
        }
       



        
        res.status(200).send({msg : 'Command Updated'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Update Command'}]})
    }
})

commandeRouter.delete('/DeleteCommand/:id', async(req,res)=>{
    try {
        const {id}= req.params

        await Commande.findByIdAndDelete(id)

        res.status(200).send({msg : 'Command Deleted'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Delete Command'}]})
    }
})




module.exports = commandeRouter