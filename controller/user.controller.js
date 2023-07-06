const jwtService = require("../service/JwtService")
const User = require("../models/user.model")

const registration = async (ctx) => {
    try {
        const {user_name, password} = ctx.request.body
        const user = await User.findOne({where: {user_name}})
        if(user) {
            ctx.status = 400
            ctx.body = {message: "This username already registrate"}
            return
        }
        if (user_name === '' || password ==='') {
            ctx.status = 400
            ctx.body = {message: "Please enter username end password"}
            return
        }
        const hashedPassword = await jwtService.hashed(password)

        let newUser = await User.create({user_name, password: hashedPassword})

        const payload = {id: newUser.id}
        console.log(payload)
        const tokens = jwtService.generateTokens(payload)
        newUser = await User.update({token: tokens.refreshToken}, {where: {id: newUser.id}, returning: true})
        ctx.status = 200
        ctx.body = newUser
    } catch (error) {
        console.log(error)
    }
}

const login = async (ctx) => {
    try {
        const {user_name, password} = ctx.request.body
        console.log(ctx.request.body)
        if (user_name === '' || password ==='') {
            ctx.status = 400
            ctx.body = {message: "Please enter username end password"}
            return
        }

        const user = await User.findOne({where: {user_name}})
        if (!user) {
            ctx.status = 400
            ctx.body = {message: "You are not registrate"}
        }

        if (!await jwtService.compairHashed(password, user.password)) {
            ctx.status = 400
            ctx.body = {message: "Username or password invalid"}
            return
        }
        const payload = {id: user.id, user_name: user.user_name}
        const tokens = jwtService.generateTokens(payload)

        const logUser = await User.update({token: tokens.refreshToken},{where: {id: user.id}, returning: true})
        ctx.status = 200
        ctx.body = tokens
    } catch (error) {
        console.log(error)
    }
}

const logout = async (ctx) => {
    try { 
        const id = ctx.params.id
        const user = await User.findOne({where: {id}})
        if (!user) {
            ctx.status = 400
            ctx.body = {message: "BadRequest"}
        }
        const logoutUser = await User.update({token: null}, {where: {id: user.id}})
        ctx.status = 200
        ctx.body = {message: "Successfully logout"}
    } catch (error) {
        console.log(error)
    }
}

const update = async (ctx) => {
    try {
        const id = ctx.params.id
        const updateUser = await User.update(ctx.request.body, {where: {id}, returning: true})
        ctx.status = 200
        ctx.body = updateUser
    } catch (error) {
        console.log(error)
    }
}

const remove = async (ctx) => {
    try {
        const id = ctx.params.id
        const updateUser = await User.destroy({where: {id}, returning: true})
        ctx.status = 200
        ctx.body = {message: "Successfully removed"}
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registration,
    login,
    logout,
    update,
    remove,
}