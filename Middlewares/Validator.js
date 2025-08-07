const {body, validationResult } = require('express-validator')

exports.validRegister = [
    body('email', 'Not a valid E-mail').isEmail(),
    body('password','Your passwrod must contain 8 characters').isLength({min : 8})
]

exports.validSignIn = [
    body('email', 'Not a valid E-mail').isEmail(),
    body('password','Your passwrod must contain 8 characters').isLength({min : 8})
]

exports.validUpdateUser = [
    body('email')
    .isEmail()
    .optional()
    .withMessage('Please provide a valid email address'),

    body('name')
    .optional()
    .isString()
    .trim()
    .isLength({min:2, max:50})
    .withMessage('Name must be between 2 and 50 characters'),

    body('phoneNumber')
    .optional()
    .matches(/^\+?\d{7,15}$/)
    .withMessage('Enter a valid phone number'),

     body('adress')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Address must be less than 100 characters'),

]

exports.validation=(req,res,next)=>{
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send(errors)
    }
console.log('Incoming content-type:', req.headers['content-type'])
    next()
}