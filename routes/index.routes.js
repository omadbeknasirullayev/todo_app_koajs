const Router = require('@koa/router')
const postRoutes = require('./post.routes')
const userRoutes = require('./user.routes')
const router = new Router()


router.use("/api/post", postRoutes())
router.use("/api/user", userRoutes())

module.exports = router.routes()