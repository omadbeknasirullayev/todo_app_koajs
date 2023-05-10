const Post = require("../models/post.model")



const add = async (ctx) => {
    try {
        if (ctx.request.body.title === "") {
            ctx.status = 400
            ctx.body = {message: "Please enter title"}
            return 
        }
        const newPost = await Post.create(ctx.request.body)
        ctx.status = 200
        ctx.body = newPost 
    } catch (error) {
        console.log(error)
    }
}

const getAll = async(ctx) => {
    try {
        const posts = await Post.findAll()
        ctx.status = 200
        ctx.body = posts
    } catch (error) {
        console.log(error)
    }
}

const getById = async(ctx) => {
    try {
        const id = ctx.params
        if (!id) {
            ctx.status = 400
            ctx.body = {message: 'This id is not found'}
            return
        }
        const post = await Post.findOne({where: {id}})
        ctx.status = 200
        ctx.body = post
    } catch (error) {
        console.log(error)
    }
}

const getByUserId = async (ctx) => {
    try {
        const {user_id} = ctx.prequest.body
        if (!id) {
            ctx.status = 400
            ctx.body = {massage: "Not Found"}
            return
        }
        const userPosts = await Post.findAll({where: {user_id}})
        ctx.status = 200
        ctx.body = userPosts
    } catch (error) {
        console.log(error)
    }
}

const update = async (ctx) => {
    try {
        const id = ctx.params
        if (!id) {
            ctx.status = 400
            ctx.body = {massage: "invalid id"}
            return
        }
        const updatePost = await Post.update(ctx.request.body, {where: {id}, returning: true})
        ctx.status = 200
        ctx.body = updatePost
    } catch (error) {
        console.log(error)
    }
}

const remove = async (ctx) => {
    const id = ctx.params.id
    const post = await Post.findOne({where: {id}})
    if (!post) {
        ctx.status = 400
        ctx.body = {message: "Title not found"}
    }

    await Post.destroy({where: {id}})
    ctx.status = 200
    ctx.body = {message: "Successfully removed"}
}



module.exports = {
    add,
    getAll,
    getById,
    getByUserId,
    update,
    remove,
}