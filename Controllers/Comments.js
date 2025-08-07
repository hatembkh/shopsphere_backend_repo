const Comments = require("../Models/Comments")


exports.AddComments =  async(req,res)=>{
    try {
        const newComment = new Comments(req.body)

        await newComment.save()

        res.status(200).send({msg : 'Comment Added', newComment})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Add Comment'}]})
    }
} 

exports.GetAllComments = async(req,res)=>{
    try {
        const GetAllComments = await Comments.find()

        res.status(500).send({msg : 'All Comments', GetAllComments})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Get Comments'}]})
    }
}

exports.GetOneComment = async(req,res)=>{
    try {
        const {id}= req.params

        const GetOneComment = await Comments.findById(id)

        res.status(500).send({msg : 'Comment', GetOneComment})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Get Comment'}]})
    }
}

exports.UpdateComments = async(req,res)=>{
    try {
        const {id}= req.params

        await Comments.findByIdAndUpdate(id, req.body)

        res.status(200).send({msg : 'Comment Updated'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Update Comment'}]})
    }
}

exports.DeleteComments = async(req,res)=>{
    try {
        const {id}= req.params

        await Comments.findByIdAndDelete(id)

        res.status(200).send({msg : 'Comment Deleted'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not Delete Comment'}]})
    }
}