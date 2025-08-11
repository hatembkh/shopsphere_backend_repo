const User = require('../Models/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { generateSignedUrl } = require('../Config/imageConfig');


exports.Register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, adress, role } = req.body
        const found = await User.findOne({ email })
        if (found) {
            return res.status(400).send({ errors: [{ msg: 'Email already exists' }] })
        }
      
        const userData = {
            name,
            email,
            password,
            phoneNumber,
            adress,
            role
        };

        // if (req.file) {
        //     userData.image = {
        //         path: `/${req.file.filename}`,
        //         filename: req.file.filename
        //     };
        // }

            if (req.file) {
            const imageUrl = generateSignedUrl(req.file.filename)
            userData.image = {
                url: imageUrl,
                filename: req.file.filename
            }
        }


        const newUser = new User(userData);
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        newUser.password = hashedPassword

        await newUser.save()

        const payload = { id: newUser._id }
        var token = jwt.sign(payload, process.env.privateKey);

        res.status(200).json({ msg: 'Account created', newUser, token })
    } catch (error) {
        
        res.status(500).json({ errors: [{ msg: 'Could not register' }] })
    }
}

exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const found = await User.findOne({ email })

        if (!found) {
            return res.status(400).send({ errors: [{ msg: 'Wrong E-mail' }] })
        }

        const matched = bcrypt.compareSync(password, found.password)

        if (!matched) {
            return res.status(400).send({ errors: [{ msg: 'Wrong Password' }] })
        }

        const payload = { id: found._id }
        var token = jwt.sign(payload, process.env.privateKey);

        res.status(200).send({ msg: 'Connected', found, token })

    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not connect' }] })
    }
}

exports.GetAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()

        res.status(200).send({ msg: 'Users', allUsers })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could get users' }] })
    }
}

exports.GetOneUser = async (req, res) => {
    try {
        const { id } = req.params

        const oneUser = await User.findById(id)

        res.status(200).send({ msg: 'User', oneUser })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could get the user' }] })
    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, phoneNumber, adress } = req.body

        //  Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid user ID format',
                    param: 'id'
                }]
            });
        }

        //  Find existing user (without password field)
        const existingUser = await User.findById(id).select('-password');
        if (!existingUser) {
            return res.status(404).json({
                errors: [{
                    msg: 'User not found',
                    param: 'id'
                }]
            });
        }

        const updateData = {
            name: name || existingUser.name,
            email: email || existingUser.email,
            phoneNumber: phoneNumber || existingUser.phoneNumber,
            adress: adress || existingUser.adress
        };



        if (req.file) {
            if (existingUser.image?.path) {
                const oldImagePath = path.join(__dirname, '..', 'public', existingUser.image.path);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.error('Error deleting old image:', err);
                });
            }
            updateData.image = {
                path: `/${req.file.filename}`,
                filename: req.file.filename
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password -__v');

           res.status(200).json({
            msg: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        
        res.status(500).send({ errors: [{ msg: 'Could not update user' }] })
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await User.findByIdAndDelete(id)

        res.status(200).send({ msg: 'User deleted' })
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not delete user' }] })
    }
}

exports.SignedURL = (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename)
    res.sendFile(filePath)
}