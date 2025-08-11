const express = require('express')


const { Register, SignIn, GetAllUsers, GetOneUser, UpdateUser, DeleteUser, SignedURL } = require('../Controllers/User');
const { validRegister, validation, validSignIn, validUpdateUser } = require('../Middlewares/Validator');
const { isAuth } = require('../Middlewares/isAuth');
const upload = require('../Config/multer');
const { verifySignedUrl } = require('../Middlewares/verifySignedUrl');

const UserRouter = express.Router()

UserRouter.post('/Register',upload.single('image'),validRegister,validation, Register)

UserRouter.post('/SignIn', validSignIn,validation,SignIn)

UserRouter.get('/currentUser', isAuth, (req,res)=> res.send(req.user))

UserRouter.get('/getAllUsers', GetAllUsers)

UserRouter.get('/getOneUser/:id', GetOneUser)

UserRouter.put('/EditUser/:id',upload.single('image'),validUpdateUser,validation, UpdateUser)

UserRouter.delete('/DeleteUser/:id', DeleteUser)

UserRouter.get('/api/images/:filename', verifySignedUrl, SignedURL)



 

module.exports = UserRouter