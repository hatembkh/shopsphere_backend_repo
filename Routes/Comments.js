const express = require('express')
const Comments = require('../Models/Comments')
const { AddComments, GetAllComments, GetOneComment, UpdateComments, DeleteComments } = require('../Controllers/Comments')

const CommentsRouter = express.Router()

CommentsRouter.post('/AddComments', AddComments)

CommentsRouter.get('/GetAllComments', GetAllComments)

CommentsRouter.get('/GetOneComment/:id', GetOneComment)

CommentsRouter.put('/UpsateComment/:id', UpdateComments)

CommentsRouter.delete('/DeleteComment/:id', DeleteComments)

module.exports = CommentsRouter