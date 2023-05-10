const Router = require('@koa/router')
const { add, getAll, getById, getByUserId, update, remove } = require('../controller/post.controller')
const router = new Router()

router.post("/add", add)
router.get("/getAll", getAll)
router.get("/getById/:id", getById)
router.get("/getByUserId", getByUserId)
router.patch("/update", update)
router.delete("/remove", remove)


module.exports = () => router.routes()  