const Router = require('@koa/router')
const { registration, login, logout, update, remove } = require('../controller/user.controller')
const router = new Router()

router.post("/registration", registration)
router.post("/login", login)
router.post("/logout", logout)
router.patch("/update", update)
router.delete("/remove", remove)


module.exports = () => router.routes()