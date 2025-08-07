const User = require("../Models/User")
var jwt = require('jsonwebtoken')
exports.isAuth =async(req,res,next)=>{
    try {
        const token = req.header('Authorized')

        var decoded = jwt.verify(token, process.env.privateKey)

        if (!decoded) {
            return res.status(400).send({errors : [{msg : 'Wrong tooooken'}]})
        }

        const found = await User.findById(decoded.id)

        req.user = found

        next()
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Wrong token'}]})
    }
}

// exports.isAuth=async(req,res,next)=>{
//     try {
//         const token = req.header('Authorized')

//         var decoded = jwt.verify(token, process.env.privateKey);

//         if (!decoded) {
//             return res.status(400).send({errors : [{msg : 'Wrong toooken'}]})
//         }

//         const found = await User.findById(decoded.id)

//         req.user = found

//         next()

//     } catch (error) {
//         res.status(500).send({errors : [{msg : 'Wrong token'}]})
//     }
// }