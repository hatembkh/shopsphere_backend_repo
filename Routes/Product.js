const express = require('express')
const { AddProduct, GetAllProducts, GetOneProduct, UpdateProduct, DeleteProduct } = require('../Controllers/Product')
const ProductRouter = express.Router()
const upload = require('../Config/multer')


ProductRouter.post('/addProduct',upload.single('image'), AddProduct)

ProductRouter.get('/getAllProducts',  GetAllProducts)
 
ProductRouter.get('/getOneProduct/:id', GetOneProduct)

ProductRouter.put('/UpdateProduct/:id',upload.single('image'), UpdateProduct)

ProductRouter.delete('/DeleteProduct/:id', DeleteProduct)



module.exports = ProductRouter